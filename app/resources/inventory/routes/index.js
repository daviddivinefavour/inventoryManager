import { Router } from 'express';
import {
  AddInventoryItem,
  GetInventory,
  GetInventoryItem,
  UpdateInventoryItem
} from '../controllers/inventory.controller';

const router = Router();

router.get('/', GetInventory);
router.post('/', AddInventoryItem);
router.get('/:id', GetInventoryItem);
router.put('/:id', UpdateInventoryItem);

export default router;
