import Event from '../models/Event';

module.exports.getId = (req,res)=>{
    Event.find({Name:req.params.Name}, function(err,docs){
        if(err) res.status(500).json(err);
        else res.status(200).json(docs);
    });
}

module.exports.createEvent = (req,res) =>{
    let insertEvent = new Event({
        Name: req.body.Name,
        Amount_of_people: req.body.Amount_of_people,
        Reservation: req.body.Reservation
    });
    insertEvent
        .save()
        .then((newEvent)=>{
            res.status(200).json(newEvent)
        })
        .catch((err)=>{
            res.status(500).json(err);
        })
    };

    module.exports.updateEvent = (req,res)=>{
        Event.findByIdAndUpdate(
            req.params.EventId,
            req.body,
            {new:true},
        (err,Event)=>{
            if(err) return res.status(500).send(err);
            return res.send(Event);
         }
      )
    }
    
    module.exports.deleteEvent = (req,res)=>{
        Event.findByIdAndRemove(req.params.EventId,(err, Event)=>{
                if(err) return res.status(500).send(err);
                const response = {
                    msg:"Event successfully deleted",
                    id: Event._id
                };
                return res.status(200).send(response);
            }); 
    }