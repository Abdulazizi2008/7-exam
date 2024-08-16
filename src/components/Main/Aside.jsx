import React, { useEffect } from "react";
import style from "./main.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { saveColors, setLoading as setLoadingC } from "../../store/colorSlice";
import { saveBrands, setLoading as setLoadingB } from "../../store/brandSlice";

function Aside({
  selectedBrand,
  setSelectedBrand,
  setSelectedColor,
  selectedColor,
}) {
  const { colors, brands } = useSelector((store) => store);
  const { loading: colorsLoading, colors: colorsList } = colors;
  const { loading: brandsLoading, brands: brandsList } = brands;

  const dispatch = useDispatch();

  useEffect(() => {
    async function fetchBrands() {
      try {
        dispatch(setLoadingB(true));
        const response = await fetch(
          "https://headphones-server.onrender.com/brands"
        );
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        dispatch(saveBrands(data));
      } catch (error) {
        console.error("Error fetching brands:", error);
      } finally {
        dispatch(setLoadingB(false));
      }
    }
    async function fetchColors() {
      try {
        dispatch(setLoadingC(true));
        const response = await fetch(
          "https://headphones-server.onrender.com/colors"
        );
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        dispatch(saveColors(data));
      } catch (error) {
        console.error("Error fetching colors:", error);
      } finally {
        dispatch(setLoadingC(false));
      }
    }
    fetchColors();
    fetchBrands();
  }, []);

  return (
    <aside className={style.product}>
      <svg
        width="270"
        height="2"
        viewBox="0 0 270 2"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <line
          y1="1"
          x2="270"
          y2="1"
          stroke="#454444"
          stroke-opacity="0.8"
          stroke-width="2"
          stroke-dasharray="4 4"
        />
      </svg>
      <div className={style.brands}>
        <h1>Brand</h1>
        {brandsLoading && <p>Loading...</p>}
        <ul className={style.brandw}>
          {brandsList.map((brand, index) => {
            return (
              <li key={brand + index}>
                <input
                  type="radio"
                  id={brand}
                  onChange={() => setSelectedBrand(brand)}
                  checked={selectedBrand === brand}
                />
                <label htmlFor={brand}>{brand}</label>
              </li>
            );
          })}
        </ul>
        <button
          style={{
            marginLeft: "10px",
            backgroundColor: selectedBrand ? "#0ba42d" : "#d5f8cf",
            color: selectedBrand ? "white" : "inherit",
            border: "none",
            cursor: "pointer",
            padding: "5px 10px",
            borderRadius: "5px",
            marginTop: "20px",
          }}
          onClick={() => setSelectedBrand("")}
        >
          reset
        </button>
        <svg
          width="270"
          height="2"
          viewBox="0 0 270 2"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <line
            y1="1"
            x2="270"
            y2="1"
            stroke="#454444"
            stroke-opacity="0.8"
            stroke-width="2"
            stroke-dasharray="4 4"
          />
        </svg>
        <div className={style.colors}>
          <h1>Colors</h1>
          {colorsLoading && <p>Loading...</p>}
          <ul className={style.colorsw}>
            {colorsList.map((color, index) => {
              return (
                <li key={color + index}>
                  <button
                    onClick={() => setSelectedColor(color)}
                    style={{
                      backgroundColor: color,
                      width: "20px",
                      height: "20px",
                      border: "1px solid",
                      borderRadius: "50%",
                      cursor: "pointer",
                      outlineOffset: "1px",
                      outline:
                        selectedColor === color ? `2px solid ${color}` : "",
                    }}
                  ></button>
                </li>
              );
            })}
          </ul>
          <button
            style={{
              marginLeft: "10px",
              backgroundColor: selectedColor ? "#0ba42d" : "#d5f8cf",
              color: selectedColor ? "white" : "inherit",
              border: "none",
              cursor: "pointer",
              padding: "5px 10px",
              borderRadius: "5px",
              marginTop: "20px",
            }}
            onClick={() => setSelectedColor("")}
          >
            reset
          </button>
        </div>
        <svg
          width="270"
          height="2"
          viewBox="0 0 270 2"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <line
            y1="1"
            x2="270"
            y2="1"
            stroke="#454444"
            stroke-opacity="0.8"
            stroke-width="2"
            stroke-dasharray="4 4"
          />
        </svg>
        <div className={style.con}>
          <h1>Connectivity</h1>
          <div className={style.inputs}>
            <div>
              <input type="checkbox" id="wireless" />
              <label htmlFor="wireless">2.4 GHz wireless technology</label>
            </div>
            <div>
              <input type="checkbox" id="bluetooth" />
              <label htmlFor="bluetooth">3.5mm audio input</label>
            </div>
            <div>
              <input type="checkbox" id="earbuds" />
              <label htmlFor="jack">Bluetooth</label>
            </div>
            <div>
              <input type="checkbox" id="jack" />
              <label htmlFor="earbuds">Wired USB input</label>
            </div>
            <div>
              <input type="checkbox" id="other" />
              <label htmlFor="other">USB-C</label>
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
}

export default Aside;
