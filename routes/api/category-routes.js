const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

// All Categories
router.get('/', (req, res) => {
  Category.findAll({include:Product}).then(allCategories => {
    const plainCategories = allCategories.map(cat => cat.get({plain:true}));
    res.json(plainCategories);
  }).catch((err) => {
    res.status(500).json({err:err})
  })
});

// One Category
router.get('/:id', (req, res) => {
  Category.findByPk(req.params.id, {include:Product}).then(oneCategory => {
    oneCategory.get({plain: true})
    res.json(oneCategory);
  }).catch((err) => {
    res.status(500).json({err:err})
  })
});

// New Category
router.post('/', (req, res) => {
  Category.create({
    category_name: req.body.category_name
  }).then((data) => {
    res.status(200).json(data)
  }).catch((err) => {
    console.log(err),
    res.status(500).json({err:err})
  }) 
});

// Update Category
router.put('/:id', (req, res) => {
  Category.update({
    category_name: req.body.category_name
  },
  {
    where: {
      id: req.params.id
    }
  }).then((updatedCat => {
    if (updatedCat[0] === 0) {
      return res.status(404).json({msg: "no category found"})
    }
    res.status(200).json(updatedCat)
  })).catch((err) => {
    res.status(500).json({err:err})
  })
});

// Delete Category
router.delete('/:id', (req, res) => {
  Category.destroy({where: {id: req.params.id}})
  .then((delCat) => {
    if (delCat === 0) {
      return res.status(404).json({msg: "no category found"})
    }
    res.status(200).json(delCat)
  }).catch((err) => {
    console.log(err)
    res.status(500).json({err:err})
  })
});

module.exports = router;
