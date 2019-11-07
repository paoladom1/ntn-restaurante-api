import Restaurant from '../models/Restaurant';


module.exports.getCode = (req,res)=>{
    Restaurant.find({Name:req.params.Name}, function(err,docs){
        if(err) res.status(500).json(err);
        else res.status(200).json(docs);
    });
}

module.exports.createRestaurant = (req,res) =>{
    let insertRestaurant = new Restaurant({
        Code: req.body.Code,
        Name: req.body.Name,
        Direction: req.body.Direction,
        Location: req.body.Location,
        Menu:req.body.Menu
    });
    insertRestaurant
        .save()
        .then((newRestaurant)=>{
            res.status(200).json(newRestaurant)
        })
        .catch((err)=>{
            res.status(500).json(err);
        })
    };

    module.exports.updateRestaurant = (req,res)=>{
        Restaurant.findByCodeAndUpdate(
            req.params.RestaurantCode,
            req.body,
            {new:true},
        (err,Restaurant)=>{
            if(err) return res.status(500).send(err);
            return res.send(Restaurant);
         }
      )
    }
    
    module.exports.deleteRestaurant = (req,res)=>{
        Restaurant.findByCodeAndRemove(req.params.RestaurantId,(err, Client)=>{
                if(err) return res.status(500).send(err);
                const response = {
                    msg:"Restaurant successfully deleted",
                    code: Restaurant._Code
                };
                return res.status(200).send(response);
            }); 
    }



