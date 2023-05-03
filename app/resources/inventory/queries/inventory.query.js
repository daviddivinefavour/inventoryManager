import moment from 'moment';
import { Inventory } from '../../../models';

export const CreateInventoryItemQuery = async (data) =>
  Inventory.create(
    { ...data },
    {
      attributes: { exclude: ['createdAt', 'updatedAt', 'deletedAt'] }
    }
  );

export const FindInventoryItemQuery = async (query) =>
  Inventory.findOne({
    where: { ...query, deletedAt: null },
    attributes: { exclude: ['createdAt', 'updatedAt', 'deletedAt'] }
  });

export const UpdateInventoryQuery = (query) => async (data) => {
  const item = await FindInventoryItemQuery({ ...query });
  if (!item) {
    return false;
  }
  item.set({ ...data });
  return item.save();
};

export const GetFullInventoryQuery = async (page = 1, limit = 15) => {
  const limiter = Number(limit);
  const pageNumber = Number(page) || 1;
  const offset = (pageNumber - 1) * limiter;
  return Inventory.findAndCountAll({
    where: {
      deletedAt: null
    },
    limit: limiter,
    offset,
    order: [['createdAt', 'DESC']],
    attributes: { exclude: ['createdAt', 'updatedAt', 'deletedAt'] }
  });
};

export const DeleteInventoryItemQuery = async (query) =>
  Inventory.destroy({
    where: { ...query }
  });

export const SoftDeleteItemQuery = async (query) => {
  const item = await FindInventoryItemQuery({ ...query });
  if (!item) {
    return false;
  }
  item.set({
    deletedAt: moment().format('YYYY-MM-DD HH:mm:ss.SSSZ')
  });
  return item.save();
};
