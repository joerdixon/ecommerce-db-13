const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', (req, res) => {
  Tag.findAll({include:Product}).then(allTags => {
    const plainTags = allTags.map(cat => cat.get({plain:true}));
    res.json(plainTags);
  }).catch((err) => {
    res.status(500).json({err:err})
  })
});

router.get('/:id', (req, res) => {
  Tag.findByPk(req.params.id, {include:Product}).then(oneTag => {
    oneTag.get({plain: true})
    res.json(oneTag);
  }).catch((err) => {
    res.status(500).json({err:err})
  })
});

// FIX
router.post('/', (req, res) => {
  Tag.create({
    tag_name: req.body.tag_name,
  }).then((data) => {
    res.status(200).json(data)
  }).catch((err) => {
    console.log(err),
    res.status(500).json({err:err})
  }) 
});

// FIX
router.put('/:id', (req, res) => {
  Tag.update({
    tag_name: req.body.tag_name
  },
  {
    where: {
      id: req.params.id
    }
  }).then((updatedTag => {
    if (updatedTag[0] === 0) {
      return res.status(404).json({msg: "no tag found"})
    }
    res.status(200).json(updatedTag)
  })).catch((err) => {
    res.status(500).json({err:err})
  })
});

router.delete('/:id', (req, res) => {
  Tag.destroy({where: {id: req.params.id}})
  .then((delTag) => {
    if (delTag === 0) {
      return res.status(404).json({msg: "no Tag found"})
    }
    res.status(200).json(delTag)
  }).catch((err) => {
    console.log(err)
    res.status(500).json({err:err})
  })
});

module.exports = router;
