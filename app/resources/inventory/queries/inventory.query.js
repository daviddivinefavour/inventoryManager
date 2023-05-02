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
  const updatedItem = await Inventory.update(
    { ...data },
    {
      where: {
        ...query
      },
      returning: true
    }
  );
  console.log('\n\n\n\n\n', updatedItem);
  return updatedItem[1][0];
};

export const GetFullInventoryQuery = async (page = 1, limit = 15) => {
  const limiter = Number(limit);
  const pageNumber = Number(page) || 1;
  const offset = (pageNumber - 1) * limiter;
  return Inventory.findAndCountAll({
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
