import { useSelector, useDispatch } from "react-redux";
import { clearCart, deleteItem } from "../../store/cartSlice";
import { FaLeftLong, FaX } from "react-icons/fa6";
import { useState, useEffect } from "react";
import style from "./cart.module.scss";
import { useNavigate } from "react-router-dom";

function Cart() {
  const navigate = useNavigate();
  const { items } = useSelector((store) => store.cart);
  const dispatch = useDispatch();
  const [counts, setCounts] = useState(() => {
    const savedCounts = {};
    items.forEach((item) => {
      const savedCount = localStorage.getItem(`count_${item.id}`);
      savedCounts[item.id] = savedCount ? JSON.parse(savedCount) : 1;
    });
    return savedCounts;
  });

  useEffect(() => {
    items.forEach((item) => {
      localStorage.setItem(`count_${item.id}`, counts[item.id]);
    });
  }, [counts, items]);

  const increment = (id) => {
    setCounts((prevCounts) => ({
      ...prevCounts,
      [id]: prevCounts[id] + 1,
    }));
  };

  const decrement = (id) => {
    setCounts((prevCounts) => ({
      ...prevCounts,
      [id]: prevCounts[id] > 1 ? prevCounts[id] - 1 : 1,
    }));
  };

  const handleDelete = (id) => {
    const confirmDelete = window.confirm("Delete from cart?");
    if (confirmDelete) {
      dispatch(deleteItem(id));
      setCounts((prevCounts) => {
        const newCounts = { ...prevCounts };
        delete newCounts[id];
        localStorage.removeItem(`count_${id}`);
        return newCounts;
      });
    }
  };

  function back() {
    navigate(-1);
  }

  return (
    <div className={style.container}>
      <div className={style.cart}>
        <div
          style={{
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            paddingTop: "74px",
          }}
          onClick={() => back()}
        >
          Back to shopping <FaLeftLong />
        </div>

        <h2 style={{ marginLeft: "20px", paddingTop: "52px" }}>
          Shopping Cart
        </h2>
        {items.length === 0 && <p>Cart is empty</p>}
        <div className={style.all2}>
          <div className={style.part1}>
            <div className={style.par1}>
              <svg
                width="833"
                height="3"
                viewBox="0 0 833 3"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <line
                  x1="0.985352"
                  y1="1.52539"
                  x2="832.985"
                  y2="1.52539"
                  stroke="#6A6969"
                  stroke-width="2"
                  stroke-dasharray="4 4"
                />
              </svg>
              <p>Product</p>
              <svg
                width="833"
                height="3"
                viewBox="0 0 833 3"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <line
                  x1="0.985352"
                  y1="1.52539"
                  x2="832.985"
                  y2="1.52539"
                  stroke="#6A6969"
                  stroke-width="2"
                  stroke-dasharray="4 4"
                />
              </svg>
            </div>
            <ul className={style.par2}>
              {items.map((item) => {
                return (
                  <li key={item.id} className={style.par3}>
                    <button
                      onClick={() => handleDelete(item.id)}
                      style={{
                        border: "none",
                        backgroundColor: "inherit",
                        cursor: "pointer",
                      }}
                    >
                      <FaX />
                    </button>
                    <div className={style.par4}>
                      <div className={style.img}>
                        <img src={item.image_url} alt={item.name} />
                      </div>
                      <div>
                        <h3>{item.brand_name}</h3>
                        <article>{item.description}</article>
                        <ul
                          style={{
                            display: "flex",
                            gap: "10px",
                            paddingTop: "8px",
                          }}
                        >
                          {item.color_options.map((color, index) => (
                            <li
                              key={index}
                              style={{
                                backgroundColor: color,
                                width: "20px",
                                height: "20px",
                                border: "1px solid",
                                borderRadius: "50%",
                              }}
                            ></li>
                          ))}
                        </ul>
                        <span>In stock</span>
                      </div>
                      <div className={style.counter_container}>
                        <div className={style.counter}>
                          <button
                            onClick={() => decrement(item.id)}
                            className={style.counter_button}
                            aria-label="Decrease quantity"
                          >
                            −
                          </button>
                          <span className={style.counter_value}>
                            {counts[item.id]}
                          </span>
                          <button
                            onClick={() => increment(item.id)}
                            className={style.counter_button}
                            aria-label="Increase quantity"
                          >
                            +
                          </button>
                        </div>
                        <p>${item.price}</p>
                      </div>
                    </div>
                  </li>
                );
              })}
            </ul>
            <button
              onClick={() => dispatch(clearCart())}
              style={{
                backgroundColor: "#4CAF50",
                color: "white",
                padding: "10px 20px",
                borderRadius: "5px",
                cursor: "pointer",
                outline: "none",
                textTransform: "uppercase",
                border: "none",
                marginTop: "30px",
              }}
            >
              Clear Cart
            </button>
          </div>
          <div className={style.part2}>
            <div className={style.svg}>
              <svg
                width="5"
                height="726"
                viewBox="0 0 5 726"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <line
                  x1="1.00001"
                  y1="725.996"
                  x2="3.91956"
                  y2="0.00186371"
                  stroke="#E9E7E7"
                  stroke-width="2"
                />
              </svg>
            </div>
            <div className={style.total}>
              <h1>CART TOTALS</h1>
              <svg
                width="385"
                height="2"
                viewBox="0 0 385 2"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <line
                  y1="1"
                  x2="385"
                  y2="1"
                  stroke="#6A6969"
                  stroke-width="2"
                  stroke-dasharray="4 4"
                />
              </svg>
              <div className={style.paragraps}>
                <div className={style.a}>
                  <p>Shipping (3-5 Business Days)</p>
                  <div>Free</div>
                </div>
                <div className={style.b}>
                  <p>TAX (estimated for the United States (US))</p>
                  <div>$0</div>
                </div>
                <div className={style.c}>
                  <p>Subtotal</p>
                  <div
                    style={{
                      display: "flex",
                      gap: "10px",
                      alignItems: "center",
                      flexWrap: "wrap",
                    }}
                  >
                    {items.map((item) => {
                      return <div key={item.id}>${item.price}</div>;
                    })}
                  </div>
                </div>
              </div>
              <svg
                width="385"
                height="2"
                viewBox="0 0 385 2"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <line
                  y1="1"
                  x2="385"
                  y2="1"
                  stroke="#6A6969"
                  stroke-width="2"
                  stroke-dasharray="4 4"
                />
              </svg>
              <div className={style.d}>
                <p>Total</p>
                <div
                  style={{
                    display: "flex",
                    gap: "10px",
                    alignItems: "center",
                    flexWrap: "wrap",
                  }}
                >
                  {items.map((item) => {
                    return <div key={item.id}>${item.price}</div>;
                  })}
                </div>
              </div>
              <button>
                <p>Proceed to Checkout</p>
              </button>
              <div
                style={{
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  gap: "10px",
                  paddingTop: "40px",
                }}
                onClick={() => back()}
              >
                Back to shopping <FaLeftLong />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Cart;
