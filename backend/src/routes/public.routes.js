import express from 'express';
import getUnits from '../controller/unit/getUnits';
const router = express.Router();

//Routes units
router.get('/units', getUnits);

router.get('/', (req, res) => {
    res.send('Hello World!');
})
export default router;