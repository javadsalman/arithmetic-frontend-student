import { Paper, TextField, Typography, Box } from '@mui/material';
import { useAuthStore } from '../../stores/authStore';
import Lang, { content } from './Lang';
import { useLanguageStore } from '../../stores/languageStore';
function ProfilePage() {
  const student = useAuthStore((state) => state.student);
  const language = useLanguageStore((state) => state.language);
  
  return (
    <Box className="max-w-7xl mx-auto">
      {/* Profile Information Section */}
      <Paper className="p-6 mb-6" sx={{ backgroundColor: 'transparent' }}>
        <Typography variant="h6"sx={{ mb: 2 }}>
          <Lang>Profil məlumatları</Lang>
        </Typography>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <TextField
            label={content[language]!['Ad']}
            value={student?.first_name}
            fullWidth
            InputProps={{ readOnly: true }}
          />
          <TextField
            label={content[language]!['Soyad']}
            value={student?.last_name}
            fullWidth
            InputProps={{ readOnly: true }}
          />
          <TextField
            label={content[language]!['Ata adı']}
            value={student?.father_name}
            fullWidth
            InputProps={{ readOnly: true }}
          />
          <TextField
            label={content[language]!['Təhsil aldığı məktəb']}
            value={student?.school}
            fullWidth
            InputProps={{ readOnly: true }}
          />
          <TextField
            label={content[language]!['Doğum tarixi']}
            value={student?.birth_date}
            fullWidth
            InputProps={{ readOnly: true }}
          />

          <TextField
            label={content[language]!['Email']}
            value={student?.email}
            fullWidth
            InputProps={{ readOnly: true }}
          />
          <TextField
            label={content[language]!['Qrup']}
            value={student?.group?.name}
            fullWidth
            InputProps={{ readOnly: true }}
          />
          <TextField
            label={content[language]!['Müəllim']}
            value={student?.group?.teacher?.first_name && student?.group?.teacher?.last_name ? 
              `${student.group.teacher.first_name} ${student.group.teacher.last_name}` : ''}
            fullWidth
            InputProps={{ readOnly: true }}
          />
        </div>
      </Paper>

      {/* Contact Information Section */}
      <Paper className="p-6" sx={{ backgroundColor: 'transparent' }}>
        <Typography variant="h6" sx={{ mb: 2 }}>
          <Lang>Əlaqə məlumatları</Lang>
        </Typography>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <TextField
            label={content[language]!['Əlaqə nömrəsi']}
            value={student?.phone}
            fullWidth
            InputProps={{ readOnly: true }}
          />
          <TextField
            label={content[language]!['Filial']}
            value={student?.branch?.name}
            fullWidth
            InputProps={{ readOnly: true }}
          />
          <TextField
            label={content[language]!['Ölkə']}
            value={student?.city?.country?.[`name_${language}`]}
            fullWidth
            InputProps={{ readOnly: true }}
          />
          <TextField
            label={content[language]!['Şəhər']}
            value={student?.city?.[`name_${language}`]}
            fullWidth
            InputProps={{ readOnly: true }}
          />
          <TextField
            label={content[language]!['Ünvan']}
            value={student?.address}
            fullWidth
            InputProps={{ readOnly: true }}
            className="md:col-span-2"
          />
        </div>
      </Paper>
    </Box>
  );
}

export default ProfilePage;

