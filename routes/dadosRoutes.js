const express = require('express');
const router = express.Router();
const { getAllMachineAliases, getMachineData } = require('../controllers/dadosController');

router.get('/:machine_alias', getMachineData);
router.get('/dados/maquinas', getAllMachineAliases);


module.exports = router;