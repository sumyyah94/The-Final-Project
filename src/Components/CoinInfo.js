import axios from "axios";
import { useEffect, useState } from "react";
import { HistoricalChart } from "../config/api";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js'

import { Line } from "react-chartjs-2";
import {
  CircularProgress,
  createTheme,
  LinearProgress,
  makeStyles,
  ThemeProvider,
} from "@material-ui/core";
import SelectButton from "./Banner/SelectButton";
import {chartDays} from "../config/data"
import { CryptoState } from "../CryptoContext";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
)
const CoinInfo = ({ coin }) => {
  const [historicData, setHistoricData] = useState();
  const [days, setDays] = useState(365);
  const { currency } = CryptoState();
  const [flag,setflag] = useState(false);

  const useStyles = makeStyles((theme) => ({
    container: {
      width: "75%",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      marginTop: 25,
      padding: 40,
      [theme.breakpoints.down("md")]: {
        width: "100%",
        marginTop: 0,
        padding: 20,
        paddingTop: 0,
      },
    },
  }));

  const classes = useStyles();

  const fetchHistoricData = async () => {
    const { data } = await axios.get(HistoricalChart(coin.id, days, currency));
    setflag(true);
    setHistoricData(data.prices);
  };


  useEffect(() => {
    fetchHistoricData();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [days]);

  const darkTheme = createTheme({
    palette: {
      primary: {
        main: "#fff",
      },
      type: "dark",
    },
  });

  if (!historicData) return <LinearProgress style={{ backgroundColor: "#a9a9a9" }} />;
  ;
  console.log("hi",coin.id,currency,days);
  console.log("hooo",historicData);

  return (
    <ThemeProvider theme={darkTheme}>
      <div className={classes.container}>
        {!historicData | flag===false ? (
          <CircularProgress
            style={{ color: "#D9D9D9" }}
            size={250}
            thickness={1}
          />
        ) : (
          <>
         
            <Line
              data={{
                labels: historicData.map((coin) => {
                  let date = new Date(coin[0]);
                  
                  let time =
                    date.getHours() > 12
                      ? `${date.getHours() - 12}:${date.getMinutes()} PM`
                      : `${date.getHours()}:${date.getMinutes()} AM`;
                  return days === 1 ? time : date.toLocaleDateString();
                }),
                datasets: [
                  {
                    data: historicData.map((coin) => coin[1]),
                    label: `Price ( Past ${days} Days ) in ${currency}`,
                    borderColor: "#D9D9D9",
                  },
                ],
              }}
              options={{
                elements: {
                  point: {
                    radius: 1,
                  },
                },
              }}
            />
            <div
              style={{
                display: "flex",
                marginTop: 20,
                justifyContent: "space-around",
                width: "100%",
              }}
            >
            {chartDays.map((day) => (
              <SelectButton
                key={day.value}
                onClick={() => {setDays(day.value);
                  setflag(false);
                }}
                selected={day.value === days}
              >
                {day.label}
              </SelectButton>
            ))}
            </div>
          </>
        )}
      </div>
    </ThemeProvider>
  );
};

export default CoinInfo;