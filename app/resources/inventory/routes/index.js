import { Router } from 'express';
import {
  AddInventoryItem,
  GetInventory,
  GetInventoryItem,
  RemoveInventoryItem,
  UpdateInventoryItem
} from '../controllers/inventory.controller';

const router = Router();

router.get('/', GetInventory);
router.post('/', AddInventoryItem);
router.get('/:id', GetInventoryItem);
router.put('/:id', UpdateInventoryItem);
router.delete('/:id', RemoveInventoryItem);

export default router;
