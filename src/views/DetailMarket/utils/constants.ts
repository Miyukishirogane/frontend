export const chartBaseOption = {
  global: {
    useUTC: false,
  },
  backgroundColor: {
    linearGradient: [54, 54, 54, 54, 0, 54],
    stops: [
      [0, '#707070'],
      [1, '#707070'],
      [2, '#e2e2e2'],
    ],
  },
  rangeSelector: {
    enabled: false,
    useHtml: true,
    allButtonsEnabled: true,
    selected: 1,
    labelStyle: {
      display: 'none',
      text: '',
    },
    x: -47,
    buttons: [
      {
        type: 'hour',
        count: 24,
        text: '1H',
      },
      {
        type: 'day',
        count: 30,
        text: '1D',
      },
      {
        type: 'week',
        count: 7,
        text: '1W',
      },
    ],
    verticalAlign: 'top',
    buttonPosition: {
      align: 'left',
      y: 12,
      x: 0,
    },
    inputEnabled: false,
    buttonSpacing: 0,
    buttonBackground: 'rgba(36, 101, 222, 1)',
    inputBoxBorderColor: true,
    buttonTheme: {
      style: {
        fill: 'none',
        color: '#595959',
        border: 'none',
        backgournd: '#fff',
      },
      stroke: 'none',
      padding: 10,
      fontWeight: 'bold',
      height: 0,
      width: 0,
      'stroke-width': 0,
      r: '24px',
      w: 100,
      states: {
        w: 250,
        hover: {
          fill: 'rgba(36, 101, 222, 1)',
          style: {
            color: 'white',
          },
        },
        select: {
          fill: 'rgba(36, 101, 222, 1)',
          style: {
            color: 'white',
          },
        },
      },
    },
  },
  chart: {
    type: '',
    height: 350,
    zooming: {
      type: 'x',
      resetButton: {
        position: {
          align: 'right',
          verticalAlign: 'bottom',
          x: 0,
          y: 0,
        },
        theme: { zIndex: 8 },
      },
    },
  },
  title: {
    text: '',
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
  plotOptions: {
    column: {
      dataGrouping: {
        enabled: false,
      },
    },
  },
};
