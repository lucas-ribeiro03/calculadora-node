exports.paginaInicial = (req, res) => {
    res.render('home');
}

exports.salvarConta = async(req, res) => {
    try{
        const {conta, resultado} = req.body;
        const novaConta = new CalcModel({
            conta,
            resultado
        });

        await novaConta.save();
    } catch(e){
        console.log(e);
        console.log('Nao salvou /////////////////////////////');
    }
}

const CalcModel = require('../models/CalcModel');
const math = require('mathjs');

