import emitter from '../../../utils/emitter';
import { response } from '../../../utils/returning';
import {
  GetInventoryService,
  AddInventoryItemService,
  UpdateInventoryItemService,
  RemoveInventoryItemService,
  GetInventoryItemService
} from '../services/inventory.service';

export const GetInventory = async (req, res) => {
  const { page, limit } = req.query;
  const allItems = await GetInventoryService(page, limit);
  return response(allItems)('Full Inventory')(res);
};

export const GetInventoryItem = async (req, res) => {
  const { id } = req.params;
  const item = await GetInventoryItemService(id);
  return response(item)('Inventory data item')(res);
};

export const AddInventoryItem = async (req, res) => {
  const newItem = await AddInventoryItemService(req.body);
  if (newItem.data?.status === 200) {
    emitter('Added New Inventory Item', newItem.data?.entity);
  }
  return response(newItem)('Add new inventory item')(res);
};

export const UpdateInventoryItem = async (req, res) => {
  const { id } = req.params;
  const updatedItem = await UpdateInventoryItemService(id, req.body);
  if (updatedItem.data?.status === 200) {
    emitter('Updated Inventory Item Details', updatedItem.data?.entity);
  }
  return response(updatedItem)('Update inventory item')(res);
};

export const RemoveInventoryItem = async (req, res) => {
  const { id } = req.params;
  const deletedItem = await RemoveInventoryItemService(id);
  if (deletedItem.data?.status === 200) {
    emitter('Removed inventory Item', { itemId: id });
  }
  return response(deletedItem)('Remove inventory item')(res);
};
