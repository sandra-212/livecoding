import React from "react";
import Select from "react-select";

export default function App() {
  interface ISelectProps<T> {
    options: T[];
    onSelect: (value: T) => void;
  }
  interface IProduct {
    id: string;
    name: string;
    price: number;
    isAvailable: boolean;
    category: string;
  }
  interface IOption {
    code: string;
    name: string;
  }
  const options = [
    { value: 1, label: "a" },
    { value: 2, label: "b" },
  ];
  const [category, setCategory] = React.useState<IOption | null>(null);
  const [products, setProducts] = React.useState<IProduct[]>([]);
  const [search, setSearch] = React.useState<string>("");

  const useDebounce = (value, delay = 500) => {
    const [debounceVal, setDebounceVal] = React.useState<string>("");
    React.useEffect(() => {
      const timer = setTimeout(() => {
        setDebounceVal(value);
      }, delay);
      return () => clearTimeout(timer);
    }, [value]);
    return debounceVal;
  };
  const debouncedVal = useDebounce(search);
  React.useEffect(() => {
    const fetchproducts = async () => {
      let params = category
        ? new URLSearchParams({
            code: category.value,
            productName: search,
          }).toString()
        : "";
      try {
        const res = await fetch(`/products?${params}`);
        if (!res.ok) {
            throw new Error(`HTTP error! status: ${res.status}`);
          }
        const data = res.json();

        setProducts(data);
      } catch (err) {
        console.log(err);
        setProducts([]);
      }
    };
    fetchproducts();
  }, [category, debouncedVal]);

  const sortProd = (val: string) => {
    if ((val = "asc")) {
      const data = products.sort((a, b) => a.price - b.price);
      setProducts(data);
    } else {
      const data = products.sort((a, b) => b.price - a.price);
      setProducts(data);
    }
  };

  return (
    <div className="App">
      <input
        type="text"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <button onClick={() => sortProd("asc")}>asc</button>
      <button onClick={() => sortProd("dsc")}>dsc</button>
      <Select
        name="category"
        options={options}
        onChange={(val) => setCategory(val.value)}
      />
      {products.length > 0 && (
        <ul>
          {products.map((pr) => {
            return (
              <li key={pr.id}>
                {" "}
                {pr.name} {pr.price}
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
