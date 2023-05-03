import { v4 as uuid } from 'uuid';
import logger from '../../../utils/logger';
import { returnResult } from '../../../utils/returning';
import {
  GetFullInventoryQuery,
  CreateInventoryItemQuery,
  FindInventoryItemQuery,
  UpdateInventoryQuery,
  SoftDeleteItemQuery,
  DeleteInventoryItemQuery
} from '../queries/inventory.query';
import validator from '../../../utils/validator';
import { CreateNewInventoryItemValidator } from '../validators/inventory.validator';
import { removeDbTimestamps } from '../../../utils/extras';

export const GetInventoryService = async (page, limit) => {
  const allInventoryItems = await GetFullInventoryQuery(page, limit);
  return returnResult(true, {
    status: 200,
    message: 'Successfully fetched full inventory.',
    entity: allInventoryItems
  });
};

export const GetInventoryItemService = async (itemId) => {
  const item = await FindInventoryItemQuery({ id: itemId });
  if (!item) {
    logger.error(`Failed to fetch inventory item\n ${item}`);
    return returnResult(false, {
      status: 422,
      message: 'Oops! Something went wrong, Unable to fetch inventory item.'
    });
  }

  return returnResult(true, {
    status: 200,
    message: 'Successfully fetched inventory item.',
    entity: item
  });
};

export const AddInventoryItemService = async (data) => {
  const validatedInventoryData = await validator(
    CreateNewInventoryItemValidator
  )(data);
  if (!validatedInventoryData.type) {
    return returnResult(false, {
      status: 422,
      title: 'Validation failed',
      message: validatedInventoryData.message
    });
  }

  const { name, unitsAvailable } = validatedInventoryData;

  const newItem = await CreateInventoryItemQuery({
    id: uuid(),
    name,
    unitsAvailable
  });

  if (!newItem) {
    logger.error(`Failed to add new inventory item\n ${newItem}`);
    return returnResult(false, {
      status: 422,
      message: 'Oops! Something went wrong, Unable to add new inventory item.'
    });
  }
  removeDbTimestamps(newItem.dataValues);
  return returnResult(true, {
    status: 200,
    message: 'Successfully added new inventory item.',
    entity: newItem
  });
};

export const UpdateInventoryItemService = async (itemId, data) => {
  const validatedInventoryData = await validator(
    CreateNewInventoryItemValidator
  )(data);
  if (!validatedInventoryData.type) {
    return returnResult(false, {
      status: 422,
      title: 'Validation failed',
      message: validatedInventoryData.message
    });
  }

  const item = await FindInventoryItemQuery({ id: itemId });
  if (!item) {
    logger.error(`Failed to fetch item record\n ${item}`);
    return returnResult(false, {
      status: 422,
      message: 'Oops! Something went wrong, Unable to locate item.'
    });
  }

  const { name, unitsAvailable } = validatedInventoryData;
  const update = await UpdateInventoryQuery({ id: itemId })({
    name,
    unitsAvailable
  });
  if (!update) {
    logger.error(`Failed to update item\n ${update}`);
    return returnResult(false, {
      status: 422,
      message: 'Oops! Something went wrong, Unable to update item.'
    });
  }
  return returnResult(true, {
    status: 200,
    message: 'Successfully updated item information.',
    entity: update
  });
};

export const RemoveInventoryItemService = async (itemid) => {
  const deleted = await SoftDeleteItemQuery({ id: itemid });
  if (!deleted) {
    logger.error(`Failed to delete item\n ${deleted}`);
    return returnResult(false, {
      status: 422,
      message: 'Oops! Something went wrong, Unable to delete item.'
    });
  }
  return returnResult(true, {
    status: 200,
    message: 'Successfully deleted item information.'
  });
};
