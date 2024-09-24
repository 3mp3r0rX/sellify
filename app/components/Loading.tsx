import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';


const Loading = () => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black opacity-90 z-50">
      <Box sx={{ display: 'flex' }}>
      <CircularProgress color="success"  />
    </Box>
    </div>
  );
};

export default Loading;
