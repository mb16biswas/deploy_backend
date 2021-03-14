const router = require('express').Router();
let User = require("../Model/Usermodel");
const bcrypt = require('bcrypt')

router.route('/all').get((req, res) => {
  User.find()
    .then(users => res.json(users))
    .catch(err => res.status(400).json('Error: ' + err));
});







router.route('/login/:email/:password').get((req, res) => {
  const email = req.params.email
  const password = req.params.password 
  
  /*
      if(bcrypt.compareSync('somePassword', hash)) {
    // Passwords match
    } else {
    // Passwords don't match
}


  */
  
  User.findOne({email : email})
    .then((user) =>{
      
      if(bcrypt.compareSync( password, user.password)){
        console.log("password matched ")
        res.json("true")
      }
      else{
        res.json("false")
      }

      
   

    
    
    
    })
    // .catch(err => res.status(400).json("false"));
    .catch(() => res.json("f"))
    
});


router.route('/:email').get((req, res) => {
    const email = req.params.email
    User.findOne({email : email})
      .then(users => res.json(users))
      .catch(err => res.status(400).json('Error: ' + err));
  });
  

router.route('/add/:email').post((req, res) => {
    const email = req.params.email
    const entry = req.body.cou 
    User.findOne({email : email})
    .then((user)=>{
      user.count = entry 

      user.save()
      .then(()=> res.json("success"))
      .catch((err) => res.status(400).json('Error: ' + err) )
    })
    .catch((err) => res.status(400).json('Error: ' + err))

    
  });
  
  module.exports = router;

router.route('/add').post((req, res) => {
  const username = req.body.username;
  let  password = req.body.password 
  const email = req.body.email 
  
  const count = 0 
  const hash = bcrypt.hashSync(password, 10)
  
  password = hash 
  


  const newUser = new User({username , 
                            password , 
                            email , 
                            count  });

  newUser.save()
    .then(() => res.json('true'))
    .catch(() => res.json("false") );
});

module.exports = router;


