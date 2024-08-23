import {useRef, useEffect} from 'react';


export function getSectionListData(data) {
  const dataByCategory = data.reduce((acc, curr) => {
    const menuItem = {
      id: curr.id,
      title: curr.title,
      price: curr.price,

/*       name: curr.name,
      price: curr.price,
      description: curr.description,
      image: curr.image,
      category: curr.category, */
    };
    if (!Array.isArray(acc[curr.category])) {
      acc[curr.category] = [menuItem];
    } else {
      acc[curr.category].push(menuItem);
    }
    return acc;
  }, {});
  const sectionListData = Object.entries(dataByCategory).map(([key, item]) => {
    return {
      title: key,
      data: item,
    };
  });
  return sectionListData;
}

export function useUpdateEffect(effect, dependencies = []) {
  const isInitialMount = useRef(true);

  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
    } else {
      return effect();
    }
  }, dependencies);
}

export function getFlatListData(data) {
  let sortedData = [];

  for (let i = 0; i < data.length; i++) {
    let menuitem = {};

    sortedData.push({"name": data[i].name, "price": data[i].price, "description": data[i].description, "image": data[i].image, "category": data[i].category});
  }

  return sortedData;
}