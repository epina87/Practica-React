export default function Filters(
  filterAdvert,
  query,
  saleName,
  priceMax,
  priceMin,
  tagsSave,
  saleType,
) {
  filterAdvert = filterAdvert.filter(advert =>
    (advert.name ?? '').toUpperCase().startsWith(query.toLocaleUpperCase()),
  );

  if (saleName !== 'todos') {
    filterAdvert = filterAdvert.filter(advert => advert.sale === saleType);
  }

  filterAdvert = filterAdvert.filter(
    advert => advert.price >= priceMin && advert.price <= priceMax,
  );

  if (tagsSave.length > 0) {
    filterAdvert = filterAdvert.filter(({ tags }) =>
      tags.some(tag => tagsSave.includes(tag)),
    );
  }

  return filterAdvert;
}
