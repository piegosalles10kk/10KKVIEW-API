const fs = require('fs').promises;
const path = require('path');

const getMachineData = async (req, res) => {
    try {
        const machine_alias = req.params.machine_alias;
        const basePath = 'E:\\TI\\SIA';
        
        const now = new Date();
        const folderName = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}`;
        const filePath = path.join(basePath, folderName, 'dados_gerais_mensal.json');

        // Verifica se o arquivo existe
        try {
            await fs.access(filePath);
        } catch (error) {
            return res.status(404).json({ error: 'Arquivo dados_gerais_mensal.json não encontrado' });
        }

        // Lê o JSON
        const data = await fs.readFile(filePath, 'utf-8');
        const jsonData = JSON.parse(data);

        // Filtra os dados da máquina pelo machine_alias
        const machineData = jsonData.filter(machine => machine.machine_alias === machine_alias);

        if (!machineData || machineData.length === 0) {
            return res.status(404).json({ error: 'Máquina não encontrada' });
        }

        // Ordena os registros pelo timestamp_coleta em ordem decrescente e retorna os últimos 30 registros
        const sortedData = machineData.sort((a, b) => new Date(b.timestamp_coleta) - new Date(a.timestamp_coleta)).slice(0, 30);

        res.status(200).json(sortedData);
    } catch (error) {
        console.error("Erro ao processar requisição:", error);
        res.status(500).json({ error: 'Erro ao buscar informações da máquina' });
    }
};

const getAllMachineAliases = async (req, res) => {
    try {
        const basePath = 'E:\\TI\\SIA';
        const now = new Date();
        const folderName = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}`;
        const filePath = path.join(basePath, folderName, 'dados_gerais_mensal.json');

        // Verifica se o arquivo existe
        try {
            await fs.access(filePath);
        } catch (error) {
            return res.status(404).json({ error: 'Arquivo dados_gerais_mensal.json não encontrado' });
        }

        // Lê o JSON
        const data = await fs.readFile(filePath, 'utf-8');
        const jsonData = JSON.parse(data);

        // Extrai os machine_alias únicos
        const machineAliases = [...new Set(jsonData.map(machine => machine.machine_alias))];

        res.status(200).json({ machineAliases });
    } catch (error) {
        console.error("Erro ao processar requisição:", error);
        res.status(500).json({ error: 'Erro ao buscar os aliases das máquinas' });
    }
};


module.exports = { getMachineData, getAllMachineAliases };