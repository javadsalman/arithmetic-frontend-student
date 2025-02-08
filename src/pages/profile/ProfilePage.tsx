import { Paper, TextField, Typography, Box } from '@mui/material';

function ProfilePage() {
  return (
    <Box className="max-w-7xl mx-auto">
      {/* Profile Information Section */}
      <Paper className="p-6 mb-6" sx={{ backgroundColor: 'transparent' }}>
        <Typography variant="h6"sx={{ mb: 2 }}>
          Profil məlumatları
        </Typography>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <TextField
            label="Ad"
            value="Tünzalə"
            fullWidth
            InputProps={{ readOnly: true }}
          />
          <TextField
            label="Soyad"
            value="Əliyeva"
            fullWidth
            InputProps={{ readOnly: true }}
          />
          <TextField
            label="Təhsil aldığı məktəb"
            value="123 nömrəli"
            fullWidth
            InputProps={{ readOnly: true }}
          />
          <TextField
            label="Doğum tarixi"
            value="20.11.2003"
            fullWidth
            InputProps={{ readOnly: true }}
          />
        </div>
      </Paper>

      {/* Contact Information Section */}
      <Paper className="p-6 mb-6" sx={{ backgroundColor: 'transparent' }}>
        <Typography variant="h6" sx={{ mb: 2 }}>
          Əlaqə məlumatları
        </Typography>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <TextField
            label="Email"
            value="tunzalealiyeva@gmail.com"
            fullWidth
            InputProps={{ readOnly: true }}
          />
          <TextField
            label="Əlaqə nömrəsi"
            value="+994 55 555 55 55"
            fullWidth
            InputProps={{ readOnly: true }}
          />
          <TextField
            label="Fin kodu"
            value="12345"
            fullWidth
            InputProps={{ readOnly: true }}
          />
          <TextField
            label="Filial"
            value="Sumqayıt"
            fullWidth
            InputProps={{ readOnly: true }}
          />
          <TextField
            label="Ünvan"
            value="Lorem İpsum"
            fullWidth
            InputProps={{ readOnly: true }}
            className="md:col-span-2"
          />
        </div>
      </Paper>

      {/* Education Center Information Section */}
      <Paper className="p-6" sx={{ backgroundColor: 'transparent' }}>
        <Typography variant="h6" sx={{ mb: 2 }}>
          Tədris Mərkəzinə bağlı məlumatları
        </Typography>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <TextField
            label="Email"
            value="tunzalealiyeva@gmail.com"
            fullWidth
            InputProps={{ readOnly: true }}
          />
          <TextField
            label="Şifrə"
            value="414 141 414"
            fullWidth
            InputProps={{ readOnly: true }}
            type="password"
          />
        </div>
      </Paper>
    </Box>
  );
}

export default ProfilePage;

