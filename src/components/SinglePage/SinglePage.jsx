import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import style from "./SinglePage.module.scss";
import { FaStar, FaCartShopping } from "react-icons/fa6";

function SingleProduct() {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [count, setCount] = useState(() => {
    const savedCount = localStorage.getItem(`count_${productId}`);
    return savedCount ? JSON.parse(savedCount) : 1;
  });

  useEffect(() => {
    localStorage.setItem(`count_${productId}`, count);
  }, [count, productId]);

  const increment = () => {
    setCount((prevCount) => prevCount + 1);
  };

  const decrement = () => {
    if (count > 1) {
      setCount((prevCount) => prevCount - 1);
    }
  };

  useEffect(() => {
    async function fetchProduct() {
      try {
        const response = await fetch(
          `https://headphones-server.onrender.com/products/${productId}`
        );
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setProduct(data);
      } catch (error) {
        console.error("Error fetching product:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchProduct();
  }, [productId]);

  if (loading) return <p>Loading...</p>;
  if (!product) return <p>Product not found</p>;

  return (
    <div className={style.container}>
      <p className={style.p}>
        Products / Gaming Headsets & Audio / <span> {product.brand_name}</span>
      </p>
      <div className={style.single}>
        <div className={style.img}>
          <img src={product.image_url} alt={product.name} />
        </div>
        <div className={style.par1}>
          <h2>{product.brand_name}</h2>
          <p>{product.description}</p>
          <span>
            <div>
              <FaStar />
              {product.ratings_stars}
            </div>
            <p>({product.rating_counts})</p>
          </span>
          <svg
            width="520"
            height="3"
            viewBox="0 0 520 3"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <line
              x1="-0.00390625"
              y1="1.07031"
              x2="520"
              y2="1.07031"
              stroke="#6A6969"
              strokeWidth="2"
              strokeDasharray="4 4"
            />
          </svg>

          <div className={style.a}>${product.price} or 99.99/month</div>
          <div className={style.b}>
            Suggested payments with 6 month special financing
          </div>
          <svg
            width="520"
            height="3"
            viewBox="0 0 520 3"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <line
              x1="-0.00390625"
              y1="1.07031"
              x2="520"
              y2="1.07031"
              stroke="#6A6969"
              strokeWidth="2"
              strokeDasharray="4 4"
            />
          </svg>
          <h1>Choose a color</h1>
          <ul
            style={{
              display: "flex",
              gap: "10px",
              paddingTop: "18px",
              paddingBottom: "12px",
            }}
          >
            {product.color_options.map((color, index) => (
              <li
                key={index}
                style={{
                  backgroundColor: color,
                  width: "66px",
                  height: "66px",
                  border: "1px solid",
                  borderRadius: "50%",
                }}
              ></li>
            ))}
          </ul>
          <svg
            width="520"
            height="3"
            viewBox="0 0 520 3"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <line
              x1="-0.00390625"
              y1="1.07031"
              x2="520"
              y2="1.07031"
              stroke="#6A6969"
              strokeWidth="2"
              strokeDasharray="4 4"
            />
          </svg>
          <div className={style.counter_container}>
            <div className={style.counter}>
              <button onClick={decrement} className={style.counter_button}>
                −
              </button>
              <span className={style.counter_value}>{count}</span>
              <button onClick={increment} className={style.counter_button}>
                +
              </button>
            </div>
            <div className={style.stock_info}>
              <span>
                Only{" "}
                <strong className={style.stock_count}>
                  {16 - count} items
                </strong>{" "}
                left!
              </span>
              <p>Don’t miss it</p>
            </div>
          </div>
          <div className={style.c}>
            <button>
              <FaCartShopping />
              <p>Add to cart</p>
            </button>
            <svg
              className={style.svg}
              width="62"
              height="62"
              viewBox="0 0 62 62"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect
                x="1.5"
                y="1.5"
                width="59"
                height="59"
                rx="8.5"
                fill="white"
              />
              <rect
                x="1.5"
                y="1.5"
                width="59"
                height="59"
                rx="8.5"
                stroke="#0D2612"
                stroke-width="3"
              />
              <g clip-path="url(#clip0_517_1640)">
                <path
                  d="M31.0004 47.7148L29.7374 46.8223C28.0749 45.6469 13.5004 35.0579 13.5004 25.3848C13.4061 22.6744 14.3886 20.037 16.2331 18.049C18.0777 16.0609 20.6343 14.884 23.3441 14.7754C24.8399 14.7901 26.3114 15.1548 27.6409 15.8403C28.9704 16.5258 30.1209 17.5131 31.0004 18.7231C31.8798 17.5131 33.0303 16.5258 34.3598 15.8403C35.6893 15.1548 37.1608 14.7901 38.6566 14.7754C41.3664 14.884 43.923 16.0609 45.7676 18.049C47.6121 20.037 48.5946 22.6744 48.5004 25.3848C48.5004 35.0579 33.9258 45.6469 32.2633 46.8223L31.0004 47.7148ZM23.3441 19.1504C21.7953 19.2601 20.3523 19.9764 19.3284 21.1436C18.3045 22.3109 17.7824 23.8349 17.8754 25.3848C17.8754 31.0956 26.4256 38.816 31.0004 42.3175C35.5751 38.8175 44.1254 31.0956 44.1254 25.3848C44.2183 23.8349 43.6962 22.3109 42.6723 21.1436C41.6484 19.9764 40.2054 19.2601 38.6566 19.1504C37.1078 19.2601 35.6648 19.9764 34.6409 21.1436C33.617 22.3109 33.0949 23.8349 33.1879 25.3848H28.8129C28.9058 23.8349 28.3837 22.3109 27.3598 21.1436C26.3359 19.9764 24.8929 19.2601 23.3441 19.1504Z"
                  fill="#0D2612"
                />
              </g>
              <defs>
                <clipPath id="clip0_517_1640">
                  <rect
                    width="35"
                    height="35"
                    fill="white"
                    transform="translate(13.5 13.5)"
                  />
                </clipPath>
              </defs>
            </svg>
          </div>
        </div>
      </div>
      <div className={style.par2}>
        <svg
          width="1294"
          height="2"
          viewBox="0 0 1294 2"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <line
            y1="1"
            x2="1294"
            y2="1"
            stroke="#6A6969"
            stroke-width="2"
            stroke-dasharray="4 4"
          />
        </svg>
        <p>Specification and details</p>
        <svg
          width="1294"
          height="2"
          viewBox="0 0 1294 2"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <line
            y1="1"
            x2="1294"
            y2="1"
            stroke="#6A6969"
            stroke-width="2"
            stroke-dasharray="4 4"
          />
        </svg>
      </div>
      <div className={style.featuresSection}>
        <h1 className={style.title}>MADE TO PLAY</h1>
        <p className={style.description}>
          The A50 X connects you to all your game libraries from each of your
          systems, with the push of a button. With unprecedented advances in
          connectivity, audio and wireless fidelity, A50 X plays at peak
          performance no matter what, how and where you want to play.
        </p>
        <div className={style.features}>
          <div className={style.feature}>
            <svg
              width="81"
              height="81"
              viewBox="0 0 81 81"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g clip-path="url(#clip0_517_1510)">
                <path
                  d="M80.5 10.221H40.5V17.7777L37.0833 11.8577C36.3519 10.591 35.2999 9.53909 34.0331 8.80776C32.7664 8.07642 31.3294 7.69141 29.8667 7.69141C28.4039 7.69141 26.967 8.07642 25.7002 8.80776C24.4334 9.53909 23.3814 10.591 22.65 11.8577L0.5 50.221H24.4367C23.6687 53.407 23.6334 56.7256 24.3335 59.9272C25.0336 63.1287 26.4509 66.1297 28.4786 68.7043C30.5063 71.2789 33.0916 73.36 36.04 74.7908C38.9883 76.2217 42.2228 76.9651 45.5 76.9651C48.7772 76.9651 52.0117 76.2217 54.96 74.7908C57.9084 73.36 60.4937 71.2789 62.5214 68.7043C64.5491 66.1297 65.9664 63.1287 66.6665 59.9272C67.3666 56.7256 67.3313 53.407 66.5633 50.221H80.5V10.221ZM17.8333 40.221L29.8667 19.3577L38.7 34.6577C35.3533 35.7674 32.328 37.6771 29.8867 40.221H17.8333ZM45.5 66.8877C43.1926 66.8877 40.9369 66.2035 39.0183 64.9215C37.0998 63.6396 35.6044 61.8175 34.7214 59.6857C33.8384 57.5539 33.6073 55.2081 34.0575 52.945C34.5077 50.6819 35.6188 48.6031 37.2504 46.9715C38.882 45.3398 40.9608 44.2287 43.2239 43.7785C45.4871 43.3284 47.8328 43.5594 49.9646 44.4424C52.0964 45.3255 53.9185 46.8208 55.2005 48.7394C56.4824 50.658 57.1667 52.9136 57.1667 55.221C57.1667 58.3152 55.9375 61.2827 53.7496 63.4706C51.5617 65.6585 48.5942 66.8877 45.5 66.8877ZM70.5 40.221H61.1133C58.2324 37.2211 54.5474 35.1159 50.5 34.1577V20.221H70.5V40.221Z"
                  fill="white"
                />
              </g>
              <defs>
                <clipPath id="clip0_517_1510">
                  <rect
                    width="80"
                    height="80"
                    fill="white"
                    transform="translate(0.5 0.222656)"
                  />
                </clipPath>
              </defs>
            </svg>

            <h3 className={style.featureTitle}>PLAYSYNC 3-SYSTEM SWITCHING</h3>
            <p className={style.featureDescription}>
              XBOX + PS5 + PC ALL AT ONCE
            </p>
          </div>
          <div className={style.feature}>
            <svg
              width="69"
              height="69"
              viewBox="0 0 69 69"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g clip-path="url(#clip0_517_1515)">
                <path
                  d="M60 33.4619V29.0391C60 22.276 57.3134 15.79 52.5312 11.0078C47.749 6.22566 41.263 3.53906 34.5 3.53906C27.737 3.53906 21.251 6.22566 16.4688 11.0078C11.6866 15.79 9 22.276 9 29.0391V33.4619C6.4602 34.6878 4.31637 36.6034 2.81334 38.9897C1.31032 41.376 0.508685 44.1369 0.5 46.9571L0.5 47.9884C0.5045 51.9832 2.09343 55.8131 4.91819 58.6379C7.74295 61.4626 11.5729 63.0516 15.5677 63.0561H23.1667V31.8894H17.5V29.0391C17.5 24.5304 19.2911 20.2064 22.4792 17.0182C25.6673 13.8301 29.9913 12.0391 34.5 12.0391C39.0087 12.0391 43.3327 13.8301 46.5208 17.0182C49.7089 20.2064 51.5 24.5304 51.5 29.0391V31.8894H45.8333V54.5561H37.3333V63.0561H53.4323C57.4271 63.0516 61.257 61.4626 64.0818 58.6379C66.9066 55.8131 68.4955 51.9832 68.5 47.9884V46.9571C68.4913 44.1369 67.6897 41.376 66.1867 38.9897C64.6836 36.6034 62.5398 34.6878 60 33.4619ZM14.6667 54.4937C13.0947 54.2742 11.6552 53.4936 10.6138 52.2959C9.57228 51.0982 8.99911 49.5642 9 47.9771V46.9457C8.99911 45.3585 9.57228 43.8246 10.6138 42.6269C11.6552 41.4292 13.0947 40.6486 14.6667 40.4291V54.4937ZM60 47.9771C60.0009 49.5642 59.4277 51.0982 58.3862 52.2959C57.3448 53.4936 55.9053 54.2742 54.3333 54.4937V40.4517C55.9053 40.6712 57.3448 41.4519 58.3862 42.6496C59.4277 43.8473 60.0009 45.3812 60 46.9684V47.9771Z"
                  fill="white"
                />
              </g>
              <defs>
                <clipPath id="clip0_517_1515">
                  <rect
                    width="68"
                    height="68"
                    fill="white"
                    transform="translate(0.5 0.722656)"
                  />
                </clipPath>
              </defs>
            </svg>

            <h3 className={style.featureTitle}>
              PRO-G GRAPHENE AUDIO TRANSDUCERS
            </h3>
            <p className={style.featureDescription}>
              INNOVATIVE PRECISION AND CLARITY
            </p>
          </div>
          <div className={style.feature}>
            <img src="/images/Cloud Lightning.png" alt="" />
            <h3 className={style.featureTitle}>
              PROFESSIONAL <br /> LIGHTSPEED WIRELESS <br /> TECHNOLOGY
            </h3>
            <p className={style.featureDescription}>
              PLUS BLUETOOTH ® MIX FOR TWO DEVICES
            </p>
          </div>
          <div className={style.feature}>
            <svg
              width="138"
              height="30"
              viewBox="0 0 138 30"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M3.6875 0.722656C4.53125 0.753906 5.25 1.06641 5.84375 1.66016C6.4375 2.22266 6.75 2.92578 6.78125 3.76953V11.5977H22.0156V3.76953C22.0469 2.89453 22.375 2.17578 23 1.61328C23.625 1.01953 24.375 0.722656 25.25 0.722656C26.0938 0.753906 26.8125 1.06641 27.4062 1.66016C28 2.22266 28.3125 2.92578 28.3438 3.76953V26.7383C28.1562 28.6133 27.125 29.6289 25.25 29.7852C24.375 29.7852 23.6094 29.5039 22.9531 28.9414C22.3281 28.3477 22.0156 27.6133 22.0156 26.7383V17.8789H6.78125V26.7383C6.59375 28.6133 5.5625 29.6289 3.6875 29.7852C2.8125 29.7852 2.04688 29.5039 1.39062 28.9414C0.765625 28.3477 0.453125 27.6133 0.453125 26.7383V3.76953C0.484375 2.89453 0.8125 2.17578 1.4375 1.61328C2.0625 1.01953 2.8125 0.722656 3.6875 0.722656ZM54.5 1.47266C56.6875 1.59766 58.4844 2.44141 59.8906 4.00391C61.2969 5.53516 62.3125 7.28516 62.9375 9.25391C63.5625 11.2227 63.875 13.2383 63.875 15.3008C63.875 17.3633 63.5625 19.3789 62.9375 21.3477C62.3438 23.3164 61.3281 25.082 59.8906 26.6445C58.4844 28.1758 56.6875 29.0039 54.5 29.1289H37.25C36.4062 29.0977 35.6875 28.8008 35.0938 28.2383C34.5312 27.6445 34.2344 26.9258 34.2031 26.082V14.457C34.2344 13.582 34.5625 12.8633 35.1875 12.3008C35.8125 11.707 36.5625 11.4102 37.4375 11.4102C38.2812 11.4414 39 11.7539 39.5938 12.3477C40.1875 12.9102 40.5 13.6133 40.5312 14.457V21.582C40.5312 22.4258 40.9688 22.8477 41.8438 22.8477H52.9062C54.0938 22.7852 55.0781 22.332 55.8594 21.4883C56.6406 20.6445 57.2031 19.6914 57.5469 18.6289C57.9219 17.5352 58.1094 16.4258 58.1094 15.3008C58.1094 14.1758 57.9219 13.082 57.5469 12.0195C57.2031 10.9258 56.6406 9.95703 55.8594 9.11328C55.0781 8.26953 54.0938 7.81641 52.9062 7.75391H37.25C35.375 7.59766 34.3594 6.58203 34.2031 4.70703C34.2031 3.83203 34.4844 3.08203 35.0469 2.45703C35.6406 1.83203 36.375 1.50391 37.25 1.47266H54.5ZM78.9219 0.207031C80.0156 0.207031 81.0781 0.394531 82.1094 0.769531C83.1719 1.14453 84.1875 1.69141 85.1562 2.41016C85.3125 2.56641 85.4844 2.72266 85.6719 2.87891C85.8281 2.72266 86 2.56641 86.1875 2.41016C87.1562 1.69141 88.1562 1.14453 89.1875 0.769531C90.25 0.394531 91.3125 0.207031 92.375 0.207031C93.4688 0.207031 94.5312 0.394531 95.5625 0.769531C96.625 1.14453 97.625 1.70703 98.5625 2.45703C99.5312 3.17578 100.375 4.14453 101.094 5.36328C101.844 6.58203 102.219 8.03516 102.219 9.72266V26.6445C102.031 28.5195 101 29.5352 99.125 29.6914C98.25 29.6914 97.4844 29.4102 96.8281 28.8477C96.2031 28.2539 95.8906 27.5195 95.8906 26.6445V10.0977C95.8906 9.34766 95.75 8.72266 95.4688 8.22266C95.1875 7.69141 94.875 7.28516 94.5312 7.00391C94.1875 6.69141 93.8281 6.47266 93.4531 6.34766C93.0781 6.19141 92.7031 6.11328 92.3281 6.11328C91.9531 6.11328 91.5781 6.19141 91.2031 6.34766C90.8594 6.47266 90.5156 6.69141 90.1719 7.00391C89.8281 7.28516 89.5156 7.69141 89.2344 8.22266C88.9531 8.72266 88.7969 9.34766 88.7656 10.0977V26.6445C88.5781 28.5195 87.5469 29.5352 85.6719 29.6914C84.7969 29.6914 84.0312 29.4102 83.375 28.8477C82.75 28.2539 82.4375 27.5195 82.4375 26.6445V10.0977C82.4375 9.34766 82.2969 8.72266 82.0156 8.22266C81.7344 7.69141 81.4219 7.28516 81.0781 7.00391C80.7344 6.69141 80.375 6.47266 80 6.34766C79.625 6.19141 79.25 6.11328 78.875 6.11328C78.5 6.11328 78.125 6.19141 77.75 6.34766C77.4062 6.47266 77.0625 6.69141 76.7188 7.00391C76.375 7.28516 76.0625 7.69141 75.7812 8.22266C75.5 8.72266 75.3438 9.34766 75.3125 10.0977V26.6445C75.1562 28.5195 74.1406 29.5352 72.2656 29.6914C71.3906 29.6914 70.625 29.4102 69.9688 28.8477C69.3438 28.2539 69.0312 27.5195 69.0312 26.6445V9.72266C69.0938 8.03516 69.4844 6.58203 70.2031 5.36328C70.9219 4.14453 71.7656 3.17578 72.7344 2.45703C73.7031 1.70703 74.7031 1.14453 75.7344 0.769531C76.7969 0.394531 77.8594 0.207031 78.9219 0.207031ZM107.141 25.9883C107.141 25.1133 107.438 24.3789 108.031 23.7852C108.656 23.1602 109.406 22.8477 110.281 22.8477H119.281V7.75391H110.281C109.406 7.75391 108.672 7.44141 108.078 6.81641C107.453 6.22266 107.141 5.48828 107.141 4.61328C107.141 3.73828 107.438 3.00391 108.031 2.41016C108.656 1.78516 109.406 1.47266 110.281 1.47266H134.562C135.438 1.47266 136.188 1.76953 136.812 2.36328C137.406 2.98828 137.703 3.73828 137.703 4.61328C137.703 5.48828 137.391 6.23828 136.766 6.86328C136.172 7.45703 135.438 7.75391 134.562 7.75391H125.609V22.8477H134.562C135.438 22.8477 136.188 23.1445 136.812 23.7383C137.406 24.3633 137.703 25.1133 137.703 25.9883C137.703 26.8633 137.391 27.6133 136.766 28.2383C136.172 28.832 135.438 29.1289 134.562 29.1289H110.281C109.406 29.1289 108.672 28.8164 108.078 28.1914C107.453 27.5977 107.141 26.8633 107.141 25.9883Z"
                fill="white"
              />
            </svg>

            <h3 className={style.featureTitle}>
              HDMI 2.1 <br /> 4K 120HZ
            </h3>
            <p className={style.featureDescription}>SUPERIOR 24-BIT AUDIO</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SingleProduct;
