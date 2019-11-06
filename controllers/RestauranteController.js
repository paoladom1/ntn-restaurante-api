import Restaurante from '../models/Restaurant';

module.exports.readRestaurante = (req,res)=>{
    Restaurante.find((err,sucursal)=>{
        if(err) return res.status(500).send(err);
        else res.status(200).send(sucursal);
    })
}

module.exports.getCodigo = (req,res)=>{
    Restaurante.find({Nombre:req.params.Nombre}, function(err,docs){
        if(err) res.status(500).json(err);
        else res.status(200).json(docs);
    });
}

module.exports.createRestaurante = (req,res) =>{
    let insertRestaurante = new Restaurante({
        Codigo: req.body.Codigo,
        Nombre: req.body.Nombre,
        Direccion: req.body.Direccion,
        Sucursales: req.body.Sucursales,
        Menu:req.body.Menu
    });
    insertRestaurante
        .save()
        .then((newRestaurante)=>{
            res.status(200).json(newRestaurante)
        })
        .catch((err)=>{
            res.status(500).json(err);
        })
    };

module.exports.updateRestaurante = (req,res)=>{

}

module.exports.deleteRestaurante = (req,res)=>{

}



