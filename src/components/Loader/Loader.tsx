import { Bars } from "react-loader-spinner";
import styles from "./Loader.module.css";

const Loader: React.FC = () => {
  return (
    <div className={styles.backdrop}>
      <Bars
        height={60}
        width={60}
        color="#1976d2"
        ariaLabel="bars-loading"
        visible={true}
      />
    </div>
  );
};

export default Loader;
