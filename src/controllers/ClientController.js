import Client from '../models/Client';


module.exports.getId = (req,res)=>{
    Client.find({Name:req.params.Name}, function(err,docs){
        if(err) res.status(500).json(err);
        else res.status(200).json(docs);
    });
}

module.exports.createClient = (req,res) =>{
    let insertClient = new Client({
        Name: req.body.Name,
        Email: req.body.Email,
        DUI:req.body.DUI
    });
    insertClient
        .save()
        .then((newclient)=>{
            res.status(200).json(newclient)
        })
        .catch((err)=>{
            res.status(500).json(err);
        })
    };

module.exports.updateClient = (req,res)=>{
    Client.findByIdAndUpdate(
        req.params.CLientId,
        req.body,
        {new:true},
    (err,Client)=>{
        if(err) return res.status(500).send(err);
        return res.send(Client);
     }
  )
}

module.exports.deleteClient = (req,res)=>{
    Client.findByIdAndRemove(req.params.ClientId,(err, Client)=>{
            if(err) return res.status(500).send(err);
            const response = {
                msg:"Client successfully deleted",
                id: Client._id
            };
            return res.status(200).send(response);
        }); 
}