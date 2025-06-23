export const defaultChartOptions = {
  global: {
    useUTC: false,
  },
  chart: {
    type: '',
    height: 400,
  },
  plotOptions: {
    area: {
      lineWidth: 1,
      marker: {
        enabled: false,
        states: {
          hover: {
            enabled: true,
            radius: 5,
          },
        },
      },
      shadow: false,
      states: {
        hover: {
          lineWidth: 1,
        },
      },
    },
  },
  rangeSelector: {
    enabled: false,
    allButtonsEnabled: false,
  },
  navigator: {
    enabled: false,
  },
  scrollbar: {
    enabled: false,
  },
  credits: {
    enabled: false,
  },
};
