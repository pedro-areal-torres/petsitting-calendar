import { pgTable, varchar, pgEnum, serial } from 'drizzle-orm/pg-core';

export const petType = pgEnum('pet_type', ['dog', 'cat']);

export const pets = pgTable('pets', {
  id: serial('id').primaryKey(),
  name: varchar('name', { length: 100 }).notNull(),
  type: petType('type').notNull().default('dog'),
});
