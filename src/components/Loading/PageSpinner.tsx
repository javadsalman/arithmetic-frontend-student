import { CircularProgress } from '@mui/material';

const PageSpinner = () => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/30 z-50">
        <CircularProgress size={150} color="warning" />
    </div>
  );
};

export default PageSpinner;
