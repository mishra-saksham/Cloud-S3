import { useCallback, useEffect, useState } from 'react'
import styles from '../styles/home.module.css'
function Sidebar() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  function toggle_sidebar(){
    setIsSidebarOpen(!isSidebarOpen); 
  }
  return(
    <div className={`${styles.sidebar} ${isSidebarOpen ? styles.sidebar_open : styles.sidebar_closed}`}>
      <div className={styles.major_tag_head}>
        <span className={styles.logo}>
          {isSidebarOpen ? (
            <svg xmlns="http://www.w3.org/2000/svg" width="200" height="70" viewBox="0 0 200 70" fill="none"><path fill-rule="evenodd" clip-rule="evenodd" d="M53.5748 27.5856C59.9174 29.5866 64.5161 35.5164 64.5161 42.5203C64.5161 51.1051 57.6072 58.0762 49.0462 58.1766L49.0473 58.1777H33.3899H17.7325L17.7644 58.1462C7.85785 57.5766 0 49.3626 0 39.3133C0 28.8948 8.44586 20.449 18.8644 20.449C21.1697 20.449 23.3784 20.8625 25.4204 21.6194C27.7163 16.4827 32.8704 12.9032 38.8606 12.9032C46.9764 12.9032 53.5576 19.4738 53.5748 27.5856ZM54.1462 34.7126C58.1892 35.9881 61.1205 39.7679 61.1205 44.2324C61.1205 49.7045 56.7166 54.1481 51.2596 54.2121L51.2603 54.2128H41.2799H31.2994L31.3197 54.1927C25.005 53.8297 19.9962 48.5939 19.9962 42.1882C19.9962 35.5471 25.3798 30.1635 32.0209 30.1635C33.4903 30.1635 34.8982 30.4271 36.1999 30.9096C37.6633 27.6353 40.9487 25.3537 44.767 25.3537C49.9403 25.3537 54.1353 29.5419 54.1462 34.7126Z" fill="url(#paint0_linear_11_52)"/><path fill-rule="evenodd" clip-rule="evenodd" d="M58.8568 45.9821C58.8568 43.1559 57.0012 40.7632 54.4419 39.9558C54.4349 36.6826 51.7794 34.0313 48.5046 34.0313C46.0875 34.0313 44.0077 35.4757 43.0813 37.5484C42.2574 37.2429 41.3661 37.0761 40.4359 37.0761C36.232 37.0761 32.824 40.4841 32.824 44.688C32.824 48.743 35.9947 52.0574 39.9921 52.2872L39.9792 52.3H46.2971H52.615L52.6146 52.2995C56.069 52.259 58.8568 49.4461 58.8568 45.9821Z" fill="url(#paint1_linear_11_52)"/><path d="M88.3663 27.1144C87.2234 27.1144 86.1939 27.3127 85.2777 27.7094C84.371 28.0967 83.5965 28.6634 82.9542 29.4095C82.3214 30.1463 81.8349 31.0388 81.4949 32.0872C81.1549 33.1357 80.9849 34.3163 80.9849 35.6292C80.9849 37.3671 81.254 38.8783 81.7924 40.1629C82.3402 41.438 83.1525 42.425 84.2293 43.1239C85.3155 43.8229 86.6709 44.1724 88.2954 44.1724C89.2211 44.1724 90.09 44.0968 90.9023 43.9457C91.724 43.7851 92.5222 43.5868 93.2967 43.3506V45.4475C92.541 45.7308 91.7476 45.9386 90.9165 46.0708C90.0853 46.2125 89.0983 46.2834 87.9554 46.2834C85.8491 46.2834 84.0876 45.8489 82.6708 44.9799C81.2635 44.1015 80.2056 42.8642 79.4972 41.268C78.7983 39.6717 78.4488 37.7874 78.4488 35.615C78.4488 34.0471 78.6661 32.6162 79.1005 31.3222C79.5445 30.0187 80.1867 28.8948 81.0274 27.9503C81.8774 27.0057 82.9164 26.2785 84.1443 25.7684C85.3816 25.2489 86.7984 24.9892 88.3946 24.9892C89.443 24.9892 90.4537 25.0931 91.4265 25.3009C92.3994 25.5087 93.2778 25.8062 94.0617 26.1934L93.0983 28.2336C92.4371 27.9314 91.7099 27.6716 90.9165 27.4544C90.1325 27.2277 89.2825 27.1144 88.3663 27.1144ZM99.7997 46H97.4337V23.9549H99.7997V46ZM118.161 38.2077C118.161 39.4828 117.996 40.621 117.665 41.6222C117.335 42.6233 116.858 43.4687 116.234 44.1582C115.611 44.8477 114.855 45.3766 113.967 45.745C113.089 46.1039 112.093 46.2834 110.978 46.2834C109.939 46.2834 108.985 46.1039 108.116 45.745C107.257 45.3766 106.51 44.8477 105.878 44.1582C105.254 43.4687 104.768 42.6233 104.418 41.6222C104.078 40.621 103.908 39.4828 103.908 38.2077C103.908 36.5076 104.196 35.0625 104.773 33.8724C105.349 32.6728 106.17 31.7614 107.238 31.138C108.315 30.5052 109.594 30.1888 111.077 30.1888C112.494 30.1888 113.731 30.5052 114.789 31.138C115.856 31.7708 116.683 32.687 117.269 33.8865C117.864 35.0766 118.161 36.517 118.161 38.2077ZM106.345 38.2077C106.345 39.4545 106.51 40.536 106.841 41.4521C107.172 42.3683 107.682 43.0767 108.371 43.5773C109.061 44.0779 109.949 44.3282 111.035 44.3282C112.111 44.3282 112.995 44.0779 113.684 43.5773C114.383 43.0767 114.898 42.3683 115.228 41.4521C115.559 40.536 115.724 39.4545 115.724 38.2077C115.724 36.9704 115.559 35.9031 115.228 35.0058C114.898 34.0991 114.388 33.4001 113.698 32.909C113.009 32.4178 112.116 32.1722 111.021 32.1722C109.405 32.1722 108.22 32.7059 107.464 33.7732C106.718 34.8405 106.345 36.3187 106.345 38.2077ZM135.049 30.4721V46H133.122L132.782 43.8182H132.655C132.334 44.3565 131.918 44.8099 131.408 45.1783C130.898 45.5466 130.322 45.8205 129.68 46C129.047 46.1889 128.371 46.2834 127.654 46.2834C126.426 46.2834 125.396 46.085 124.565 45.6883C123.734 45.2916 123.106 44.6777 122.681 43.8465C122.265 43.0153 122.057 41.948 122.057 40.6446V30.4721H124.437V40.4746C124.437 41.7686 124.73 42.7367 125.316 43.379C125.901 44.0118 126.794 44.3282 127.994 44.3282C129.146 44.3282 130.062 44.111 130.742 43.6765C131.432 43.242 131.927 42.6045 132.23 41.7638C132.532 40.9138 132.683 39.8748 132.683 38.6469V30.4721H135.049ZM145.547 46.2834C143.583 46.2834 142.024 45.6127 140.872 44.2715C139.729 42.9303 139.158 40.9374 139.158 38.2927C139.158 35.6197 139.743 33.6032 140.915 32.2431C142.086 30.8735 143.644 30.1888 145.59 30.1888C146.412 30.1888 147.129 30.2974 147.743 30.5146C148.357 30.7319 148.886 31.0247 149.33 31.393C149.774 31.7519 150.147 32.1628 150.449 32.6256H150.619C150.582 32.3328 150.544 31.9314 150.506 31.4214C150.468 30.9113 150.449 30.4957 150.449 30.1746V23.9549H152.801V46H150.903L150.549 43.7898H150.449C150.157 44.2526 149.784 44.673 149.33 45.0508C148.886 45.4286 148.353 45.7308 147.729 45.9575C147.115 46.1747 146.388 46.2834 145.547 46.2834ZM145.916 44.3282C147.578 44.3282 148.754 43.8559 149.444 42.9114C150.133 41.9669 150.478 40.5643 150.478 38.7036V38.2786C150.478 36.3045 150.147 34.7886 149.486 33.7307C148.834 32.6728 147.644 32.1439 145.916 32.1439C144.471 32.1439 143.389 32.7012 142.671 33.8157C141.954 34.9208 141.595 36.432 141.595 38.3494C141.595 40.2573 141.949 41.7308 142.657 42.7697C143.375 43.8087 144.461 44.3282 145.916 44.3282ZM169.831 40.4887C169.831 41.7166 169.524 42.765 168.91 43.634C168.306 44.4935 167.456 45.1499 166.36 45.6033C165.264 46.0567 163.975 46.2834 162.492 46.2834C161.708 46.2834 160.967 46.2456 160.268 46.17C159.569 46.0945 158.927 45.9858 158.341 45.8442C157.755 45.7025 157.241 45.5277 156.797 45.3199V43.0106C157.505 43.3034 158.369 43.5773 159.389 43.8323C160.409 44.0779 161.477 44.2007 162.591 44.2007C163.63 44.2007 164.509 44.0637 165.226 43.7898C165.944 43.5065 166.487 43.1051 166.856 42.5856C167.234 42.0566 167.422 41.4238 167.422 40.6871C167.422 39.9787 167.267 39.3884 166.955 38.9161C166.643 38.4344 166.124 37.9999 165.396 37.6127C164.679 37.216 163.696 36.7957 162.45 36.3517C161.571 36.0401 160.797 35.7 160.126 35.3317C159.455 34.9539 158.893 34.5288 158.44 34.0566C157.987 33.5843 157.642 33.0365 157.406 32.4131C157.179 31.7897 157.066 31.0766 157.066 30.2738C157.066 29.1687 157.344 28.2242 157.902 27.4402C158.468 26.6468 159.248 26.0423 160.239 25.6267C161.241 25.2017 162.388 24.9892 163.682 24.9892C164.787 24.9892 165.807 25.0931 166.742 25.3009C167.687 25.5087 168.551 25.7873 169.335 26.1368L168.584 28.2053C167.838 27.8936 167.045 27.6338 166.204 27.426C165.373 27.2182 164.513 27.1144 163.626 27.1144C162.738 27.1144 161.987 27.2466 161.373 27.511C160.768 27.7661 160.306 28.1297 159.984 28.602C159.663 29.0742 159.503 29.6362 159.503 30.2879C159.503 31.0152 159.654 31.6197 159.956 32.1014C160.268 32.5831 160.759 33.0129 161.43 33.3907C162.11 33.759 163.007 34.1463 164.121 34.5524C165.34 34.9964 166.374 35.4686 167.224 35.9692C168.074 36.4604 168.721 37.0649 169.165 37.7827C169.609 38.4911 169.831 39.3931 169.831 40.4887ZM185.472 30.1179C185.472 31.0435 185.293 31.8464 184.934 32.5264C184.575 33.2065 184.074 33.7638 183.432 34.1982C182.79 34.6233 182.034 34.9208 181.165 35.0908V35.2042C182.809 35.4119 184.041 35.9409 184.863 36.7909C185.694 37.641 186.11 38.7555 186.11 40.1345C186.11 41.3341 185.826 42.3967 185.26 43.3223C184.702 44.2479 183.843 44.9752 182.681 45.5041C181.529 46.0236 180.051 46.2834 178.247 46.2834C177.151 46.2834 176.136 46.1936 175.201 46.0142C174.275 45.8442 173.387 45.5561 172.537 45.1499V42.9398C173.397 43.3648 174.332 43.7001 175.342 43.9457C176.353 44.1818 177.33 44.2999 178.275 44.2999C180.164 44.2999 181.529 43.9268 182.369 43.1806C183.21 42.425 183.63 41.3955 183.63 40.092C183.63 39.1947 183.394 38.4722 182.922 37.9244C182.459 37.3671 181.789 36.961 180.91 36.7059C180.041 36.4415 178.993 36.3092 177.765 36.3092H175.696V34.2974H177.779C178.903 34.2974 179.857 34.1321 180.641 33.8015C181.425 33.471 182.02 33.0081 182.426 32.4131C182.842 31.8086 183.05 31.0955 183.05 30.2738C183.05 29.2254 182.7 28.4178 182.001 27.8511C181.302 27.2749 180.353 26.9868 179.153 26.9868C178.417 26.9868 177.746 27.0624 177.142 27.2135C176.537 27.3646 175.97 27.5724 175.441 27.8369C174.913 28.1014 174.384 28.4083 173.855 28.7578L172.665 27.1427C173.42 26.5571 174.341 26.0518 175.427 25.6267C176.513 25.2017 177.746 24.9892 179.125 24.9892C181.241 24.9892 182.828 25.4709 183.885 26.4343C184.943 27.3977 185.472 28.6256 185.472 30.1179Z" fill="black"/><defs><linearGradient id="paint0_linear_11_52" x1="1.3205" y1="32.5222" x2="53.6364" y2="65.8327" gradientUnits="userSpaceOnUse"><stop stop-color="#0047FF"/><stop offset="0.5625" stop-color="#658FFC"/><stop offset="0.744792" stop-color="#56A4FD"/><stop offset="0.808841" stop-color="#50ACFE"/><stop offset="0.870122" stop-color="#4DB6FF"/><stop offset="1" stop-color="#00A3FF"/></linearGradient><linearGradient id="paint1_linear_11_52" x1="33.3568" y1="41.9477" x2="54.4668" y2="55.3888" gradientUnits="userSpaceOnUse"><stop stop-color="#0047FF"/><stop offset="0.5625" stop-color="#658FFC"/><stop offset="0.744792" stop-color="#56A4FD"/><stop offset="0.808841" stop-color="#50ACFE"/><stop offset="0.870122" stop-color="#4DB6FF"/><stop offset="1" stop-color="#00A3FF"/></linearGradient></defs></svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" width="38" height="38" viewBox="0 0 38 38" fill="none"><path fill-rule="evenodd" clip-rule="evenodd" d="M30.2973 14.9981C33.7458 16.086 36.2461 19.31 36.2461 23.118C36.2461 27.7854 32.4898 31.5755 27.8353 31.6302L27.8359 31.6308H19.3231H10.8103L10.8277 31.6136C5.44149 31.304 1.16919 26.8381 1.16919 21.3744C1.16919 15.7099 5.76114 11.1179 11.4256 11.1179C12.679 11.1179 13.8798 11.3428 14.99 11.7543C16.2383 8.96151 19.0406 7.01538 22.2974 7.01538C26.7099 7.01538 30.288 10.5878 30.2973 14.9981ZM30.6081 18.873C32.8062 19.5665 34.4 21.6215 34.4 24.0488C34.4 27.0239 32.0056 29.4399 29.0387 29.4747L29.0391 29.4751H23.6128H18.1865L18.1976 29.4642C14.7643 29.2668 12.041 26.4201 12.041 22.9374C12.041 19.3267 14.968 16.3997 18.5787 16.3997C19.3777 16.3997 20.1431 16.543 20.8508 16.8053C21.6465 15.0251 23.4327 13.7846 25.5087 13.7846C28.3214 13.7846 30.6022 16.0617 30.6081 18.873Z" fill="url(#paint0_linear_11_53)"/><path fill-rule="evenodd" clip-rule="evenodd" d="M33.1692 25.0001C33.1692 23.4636 32.1603 22.1627 30.7689 21.7237C30.7651 19.9441 29.3213 18.5026 27.5408 18.5026C26.2267 18.5026 25.0959 19.2878 24.5922 20.4148C24.1442 20.2487 23.6597 20.158 23.1539 20.158C20.8683 20.158 19.0154 22.0109 19.0154 24.2965C19.0154 26.5012 20.7393 28.3032 22.9126 28.4282L22.9056 28.4351H26.3406H29.7342H29.7756L29.7754 28.4349C31.6535 28.4128 33.1692 26.8834 33.1692 25.0001Z" fill="url(#paint1_linear_11_53)"/><defs><linearGradient id="paint0_linear_11_53" x1="1.88714" y1="17.6821" x2="30.3309" y2="35.7927" gradientUnits="userSpaceOnUse"><stop stop-color="#0047FF"/><stop offset="0.5625" stop-color="#658FFC"/><stop offset="0.744792" stop-color="#56A4FD"/><stop offset="0.808841" stop-color="#50ACFE"/><stop offset="0.870122" stop-color="#4DB6FF"/><stop offset="1" stop-color="#00A3FF"/></linearGradient><linearGradient id="paint1_linear_11_53" x1="19.3051" y1="22.8067" x2="30.7824" y2="30.1145" gradientUnits="userSpaceOnUse"><stop stop-color="#0047FF"/><stop offset="0.5625" stop-color="#658FFC"/><stop offset="0.744792" stop-color="#56A4FD"/><stop offset="0.808841" stop-color="#50ACFE"/><stop offset="0.870122" stop-color="#4DB6FF"/><stop offset="1" stop-color="#00A3FF"/></linearGradient></defs></svg>
          )}
        </span>
        <button onClick={ 
          (e) => {
            toggle_sidebar();
          }
        } className={styles.button_close_s}>
        {isSidebarOpen ? (
          <svg className={styles.obj_svg} xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 100 100" fill="none"><path d="M70.7263 1.06678C72.1487 -0.355591 74.4548 -0.355595 75.8772 1.06678C77.2995 2.48915 77.2995 4.79527 75.8772 6.21764L26.9439 55.1509L23.8534 52.0603C22.7155 50.9224 22.7155 49.0775 23.8534 47.9397L70.7263 1.06678Z" fill="black"/><path d="M23.8534 52.0603C22.7155 50.9224 22.7155 49.0775 23.8534 47.9397L24.8839 46.9095C26.0218 45.7716 27.8666 45.7716 29.0045 46.9095L75.8774 93.7824C77.2998 95.2047 77.2998 97.5108 75.8774 98.9332C74.455 100.356 72.1489 100.356 70.7266 98.9332L23.8534 52.0603Z" fill="black"/></svg>

        ) : (
          <svg className={styles.obj_svg} xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 100 100" fill="none"><path d="M29.2737 98.9332C27.8513 100.356 25.5452 100.356 24.1228 98.9332C22.7005 97.5108 22.7005 95.2047 24.1228 93.7824L73.0561 44.8491L76.1466 47.9397C77.2845 49.0776 77.2845 50.9225 76.1466 52.0603L29.2737 98.9332Z" fill="black"/><path d="M76.1466 47.9397C77.2845 49.0776 77.2845 50.9225 76.1466 52.0603L75.1161 53.0905C73.9782 54.2284 72.1334 54.2284 70.9955 53.0905L24.1226 6.21765C22.7002 4.79527 22.7002 2.48916 24.1226 1.06678C25.545 -0.355589 27.8511 -0.355589 29.2734 1.06678L76.1466 47.9397Z" fill="black"/></svg>
        )}
        </button>
      </div>
    </div>


  )
}
function Home() {

  return (
    <main className={styles.main}>
        <Sidebar />
    </main>
  )
}

export default Home
