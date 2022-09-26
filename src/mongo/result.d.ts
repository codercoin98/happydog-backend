import { ObjectId } from 'mongoose';
export interface UpdateResult {
  acknowledged: boolean;
  modifiedCount: number;
  upsertedId: ObjectId | null;
  upsertedCount: number;
  matchedCount: number;
}
export interface DeleteResult {
  acknowledged: boolean;
  deletedCount: number;
}
