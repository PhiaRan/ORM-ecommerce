const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', (req, res) => {
  // find all categories
  // be sure to include its associated Products
  try{
    const catagory = await Catagory.findall({
      include:[Product],

    });
    res.status(200).json(catagory);
  }
  catch (err) {
    res.status(500).json(err);
  }
});

router.get('/:id', async(req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products
  try{
    const catagory= await Category.findByPk(req.params.id,{
      include: [Product], 
    });

    if (!catagory){
      res.status(404).json({message:"catagory not found!"});
    }

    res.status(200).json(catagory)
  }catch(err){
    res.status(500).json(err)
  }
  
});

router.post('/',async (req, res) => {
  // create a new category
  try{
    const newCatagory = await Category.create(req.body)
    res.status(200).json(newCatagory)
  }
  catch (err){
    res.status(400).json(err)
  }
  
});

router.put('/:id', async(req, res) => {
  // update a category by its `id` value
  try{ const updateCatagory= await Category.update(
    {
      catagoryName: req.body.catagoryName,
    },
    {
      where:{ id:req.params.id,
      },
    }
  )

  if (!updateCatagory[0]){
    res.status(404).json({message:"catatgory not found!"})
    return;
  }

  res.status(200).json("catagory updated!")

}
catch (err){
  res.status(500).json(err)
}
});

router.delete('/:id',async (req, res) => {
  // delete a category by its `id` value

  try{ const delCatagory = await Category.destroy({where: 
    { id: req.params.id,}
  ,
});
  if(!delCatagory){
    res.status(404).json({message:"catagory not found"})
    return;
  }
  res.status(200).json("catagory deleted!")
}
catch(err){
  res.status(500).json(err)
}
});

module.exports = router;
