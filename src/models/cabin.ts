class Cabin {
  id: number;
  name: string;
  maxCapacity: number;
  regularPrice: number;
  discount: number;
  image: string;

  constructor(
    id: number,
    name: string,
    maxCapacity: number,
    regularPrice: number,
    discount: number,
    image: string,
  ) {
    (this.id = id),
      (this.name = name),
      (this.maxCapacity = maxCapacity),
      (this.regularPrice = regularPrice),
      (this.discount = discount),
      (this.image = image);
  }
}

export default Cabin;
