import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabase('little_lemon');

export async function createTable() {
  return new Promise((resolve, reject) => {
    db.transaction(
      (tx) => {
        tx.executeSql(
          'create table if not exists menuitems (name text, price text, description text, image text, category text);'
        );
      },
      reject,
      resolve
    );
  });
}

export async function getMenuItems() {
  return new Promise((resolve) => {
    db.transaction((tx) => {
      tx.executeSql('select * from menuitems', [], (_, { rows }) => {
        resolve(rows._array);
      });
    });
  });
}

export function saveMenuItems(menuItems) {
//  console.log(menuItems);
//  console.log(menuItems.map((item) =>`('${item.name}', '${item.price}', '${item.description}', '${item.image}', '${item.category}')`));

  db.transaction((tx) => {
    tx.executeSql(`insert into menuitems "salad", "10", "tasty", "sf.jpg", "salads"`);
  });

/*   db.transaction((tx) => {
    tx.executeSql(
      `insert into menuitems (name, price, description, image, category) values ${menuItems
        .map(
          (item) =>
            `('${item.name}', '${item.price}', '${item.description}', '${item.image}', '${item.category}')`
        )
        .join(', ')}`
    );
  }); */
}

export async function filterByQueryAndCategories(query, activeCategories) {
  activeCategories = activeCategories.map(v => v.toLowerCase());

//  console.log(activeCategories);
//  console.log(query);

  return new Promise((resolve, reject) => {
    if (!query) {
      db.transaction((tx) => {
        tx.executeSql(
          `select * from menuitems where ${activeCategories
            .map((category) => `category='${category}'`)
            .join(' or ')}`,
          [],
          (_, { rows }) => {
            resolve(rows._array);
          }
        );
      }, reject);
    } else {
      db.transaction((tx) => {
        tx.executeSql(
          `select * from menuitems where (name like '%${query}%') and (${activeCategories
            .map((category) => `category='${category}'`)
            .join(' or ')})`,
          [],
          (_, { rows }) => {
            resolve(rows._array);
          }
        );
      }, reject);
    }
  });
}