import { Query } from '@angular/fire/compat/firestore';
import { FieldPath, WhereFilterOp } from 'firebase/firestore';
import { query, collection, where, getDocs } from 'firebase/firestore';

export type whereQueryT = {
  fieldPath: string | FieldPath;
  opStr: WhereFilterOp;
  value: unknown;
};

type orderByQueries = string[]

export const applyPagination = (ref: any, data: any) => {
  // return ref
  const { startAt, lastVisible, limit } = data || {};
  console.log('lastVisible :>> ', lastVisible);
  if (lastVisible && limit) return ref.startAfter(lastVisible).limit(limit);
  if (startAt && limit) return ref.startAt(startAt).limit(limit);
  if (startAt) return ref.startAt(startAt);
  if (limit) return ref.limit(limit);
  return ref;
};

export const whereQuery = (ref: Query, whereQueries: whereQueryT[]) => {
  let query = ref;
  if (whereQueries && Array.isArray(whereQueries)) {
    // return whereQueries.reduce((acc, curr) => {
    //   const { fieldPath, opStr, value } = curr;
    //   if (!fieldPath || !opStr || !value) return ref;
    //   return query.where(fieldPath, opStr, value);
    // }, ref);

    whereQueries.map((curr) => {
      const { fieldPath, opStr, value } = curr;
      if (fieldPath && opStr && value) {
        query = query.where(fieldPath, opStr, value);
      }
    }, ref);
  }
  return query;
};
export const orderByQuery = (ref: any, orderByQueries: []) => {
  if (orderByQueries && Array.isArray(orderByQueries)) {
    return orderByQueries.reduce((acc, curr) => {
      if (Array.isArray(curr)) {
        return ref.orderBy(curr[0], curr[1]);
      }
      return ref.orderBy(curr);
    }, ref);
  }
  return ref;
};
export const likeQuery = (ref: any, likeQueries: any[]) => {
  if (likeQueries && Array.isArray(likeQueries)) {
    return likeQueries.reduce((acc, curr) => {
      const { fieldPath, value } = curr;
      if (!value) return ref;
      return ref.orderBy(fieldPath).startAt(value).endAt(`${value}\uf8ff`);
      // return ref.orderBy(fieldPath)
      // .where(fieldPath, ">=", (value as string).toUpperCase())
      // .where(fieldPath, "<=", (value as string).toLowerCase() + "\uf8ff")
    }, ref);
  }
  return ref;
};
