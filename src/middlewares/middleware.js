exports.middlewareGlobal = (req, res, next) => {
    console.log('Passei no middleware');
    next();
};