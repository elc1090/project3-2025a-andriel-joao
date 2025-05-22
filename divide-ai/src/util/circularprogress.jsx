import * as React from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

function CircularProgressWithSeconds({ secondsLeft, totalSeconds }) {
  const percentage = (secondsLeft / totalSeconds) * 100;

  return (
    <Box sx={{ position: 'relative', display: 'inline-flex' }}>
      <CircularProgress
        variant="determinate"
        value={percentage}
        sx={{ color: 'white' }}
        size={60}
      />
      <Box
        sx={{
          top: 0,
          left: 0,
          bottom: 0,
          right: 0,
          position: 'absolute',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Typography
          fontFamily={"'Jersey 15'"}
          variant="caption"
          component="div"
          sx={{ color: 'white', fontSize: 16 }}
        >
          {`${secondsLeft}s`}
        </Typography>
      </Box>
    </Box>
  );
}

export default function TimerWithCircularProgress({ onTimeEnd, totalSeconds = 120 }) {
  const [secondsLeft, setSecondsLeft] = React.useState(totalSeconds);

  React.useEffect(() => {
    const timer = setInterval(() => {
      setSecondsLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          if (onTimeEnd) onTimeEnd();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [onTimeEnd]);

  return <CircularProgressWithSeconds secondsLeft={secondsLeft} totalSeconds={totalSeconds} />;
}
