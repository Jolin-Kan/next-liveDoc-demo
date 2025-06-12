'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { 
  Container, 
  Box, 
  Typography, 
  Paper, 
  useTheme, 
  alpha,
  TextField,
  Button,
  InputAdornment,
  IconButton,
  keyframes,
  Snackbar,
  Alert
} from '@mui/material';
import {
  Email as EmailIcon,
  Lock as LockIcon,
  Person as PersonIcon,
  Visibility,
  VisibilityOff,
} from '@mui/icons-material';

// 定義動畫
const float = keyframes`
  0% { transform: translateY(0px); }
  50% { transform: translateY(-10px); }
  100% { transform: translateY(0px); }
`;

const gradient = keyframes`
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
`;

const shine = keyframes`
  0% { background-position: -100% 0; }
  100% { background-position: 200% 0; }
`;

const glassmorphism = {
  background: 'rgba(255, 255, 255, 0.1)',
  backdropFilter: 'blur(10px)',
  WebkitBackdropFilter: 'blur(10px)',
  border: '1px solid rgba(255, 255, 255, 0.2)',
  boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.15)',
};

export default function Home() {
  const theme = useTheme();
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [isLogin, setIsLogin] = useState(true);
  const [mounted, setMounted] = useState(false);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'success' as 'success' | 'error'
  });

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleClickShowPassword = () => setShowPassword(!showPassword);
  const toggleForm = () => setIsLogin(!isLogin);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // 這裡可以添加實際的登錄/註冊邏輯
    try {
      // 模擬登錄/註冊成功
      if (isLogin) {
        // 登錄成功後跳轉
        router.push('/Home');
      } else {
        // 註冊成功後顯示提示
        setSnackbar({
          open: true,
          message: '註冊成功！請登錄',
          severity: 'success'
        });
        setIsLogin(true);
      }
    } catch (error) {
      setSnackbar({
        open: true,
        message: '操作失敗，請重試',
        severity: 'error'
      });
    }
  };

  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        background: `linear-gradient(135deg, ${alpha(theme.palette.primary.main, 0.2)} 0%, ${alpha(theme.palette.secondary.main, 0.2)} 100%)`,
        backgroundSize: '400% 400%',
        animation: `${gradient} 15s ease infinite`,
        py: { xs: 2, md: 4 },
        display: 'flex',
        flexDirection: 'column',
        position: 'relative',
        overflow: 'hidden',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'linear-gradient(45deg, transparent 0%, rgba(255,255,255,0.1) 50%, transparent 100%)',
          backgroundSize: '200% 200%',
          animation: `${shine} 8s linear infinite`,
          pointerEvents: 'none'
        }
      }}
    >
      {/* 裝飾性玻璃球 */}
      <Box
        sx={{
          position: 'absolute',
          width: '300px',
          height: '300px',
          borderRadius: '50%',
          background: `radial-gradient(circle at 30% 30%, ${alpha(theme.palette.primary.main, 0.2)}, ${alpha(theme.palette.secondary.main, 0.1)})`,
          filter: 'blur(40px)',
          top: '-100px',
          right: '-100px',
          opacity: 0.6,
          animation: `${float} 8s ease-in-out infinite`
        }}
      />
      <Box
        sx={{
          position: 'absolute',
          width: '200px',
          height: '200px',
          borderRadius: '50%',
          background: `radial-gradient(circle at 30% 30%, ${alpha(theme.palette.secondary.main, 0.2)}, ${alpha(theme.palette.primary.main, 0.1)})`,
          filter: 'blur(30px)',
          bottom: '-50px',
          left: '-50px',
          opacity: 0.6,
          animation: `${float} 6s ease-in-out infinite`
        }}
      />

      <Container 
        maxWidth="lg" 
        sx={{ 
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          position: 'relative',
          zIndex: 1
        }}
      >
        <Box 
          sx={{ 
            textAlign: 'center', 
            mb: { xs: 4, md: 8 },
            mt: { xs: 2, md: 4 },
            opacity: mounted ? 1 : 0,
            transform: mounted ? 'translateY(0)' : 'translateY(20px)',
            transition: 'opacity 0.8s ease, transform 0.8s ease'
          }}
        >
          <Typography
            variant="h2"
            component="h1"
            sx={{
              fontWeight: 'bold',
              mb: 2,
              fontSize: { xs: '2rem', md: '3rem' },
              background: `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
              backgroundSize: '200% 200%',
              animation: `${gradient} 5s ease infinite`,
              backgroundClip: 'text',
              textFillColor: 'transparent',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              textShadow: '0 2px 10px rgba(0,0,0,0.1)'
            }}
          >
            知識協作平台
          </Typography>
          <Typography
            variant="h6"
            color="text.secondary"
            sx={{ 
              maxWidth: '600px', 
              mx: 'auto',
              fontSize: { xs: '1rem', md: '1.25rem' },
              opacity: 0.8,
              animation: `${float} 6s ease-in-out infinite`
            }}
          >
            與團隊一起創建、分享和協作文檔，打造您的知識庫
          </Typography>
        </Box>

        <Box 
          sx={{ 
            maxWidth: '500px', 
            mx: 'auto',
            width: '100%',
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            opacity: mounted ? 1 : 0,
            transform: mounted ? 'translateY(0)' : 'translateY(20px)',
            transition: 'opacity 0.8s ease 0.2s, transform 0.8s ease 0.2s'
          }}
        >
          <Paper
            elevation={0}
            sx={{
              p: { xs: 2, md: 4 },
              borderRadius: 4,
              transition: 'all 0.3s ease',
              ...glassmorphism,
              '&:hover': {
                transform: 'translateY(-4px)',
                boxShadow: '0 12px 40px 0 rgba(31, 38, 135, 0.25)',
                '& .MuiTextField-root': {
                  '& .MuiOutlinedInput-root': {
                    '& fieldset': {
                      borderColor: theme.palette.primary.main,
                    }
                  }
                }
              }
            }}
          >
            <Box>
              <Typography 
                variant="h5" 
                component="h2" 
                sx={{ 
                  mb: 3, 
                  fontWeight: 'medium',
                  textAlign: 'center',
                  background: `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                  backgroundSize: '200% 200%',
                  animation: `${gradient} 5s ease infinite`,
                  backgroundClip: 'text',
                  textFillColor: 'transparent',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent'
                }}
              >
                {isLogin ? '登錄' : '註冊'}
              </Typography>
              <Box 
                component="form" 
                onSubmit={handleSubmit}
                sx={{ 
                  display: 'flex', 
                  flexDirection: 'column', 
                  gap: 2,
                  '& .MuiTextField-root': {
                    transition: 'all 0.3s ease',
                    '& .MuiOutlinedInput-root': {
                      transition: 'all 0.3s ease',
                      background: 'rgba(255, 255, 255, 0.05)',
                      backdropFilter: 'blur(5px)',
                      '&:hover fieldset': {
                        borderColor: theme.palette.primary.main,
                      },
                      '&.Mui-focused fieldset': {
                        borderWidth: 2,
                      }
                    }
                  }
                }}
              >
                {!isLogin && (
                  <TextField
                    fullWidth
                    label="姓名"
                    variant="outlined"
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <PersonIcon color="action" />
                        </InputAdornment>
                      ),
                    }}
                  />
                )}
                <TextField
                  fullWidth
                  label="電子郵件"
                  variant="outlined"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <EmailIcon color="action" />
                      </InputAdornment>
                    ),
                  }}
                />
                <TextField
                  fullWidth
                  label="密碼"
                  type={showPassword ? 'text' : 'password'}
                  variant="outlined"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <LockIcon color="action" />
                      </InputAdornment>
                    ),
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton 
                          onClick={handleClickShowPassword} 
                          edge="end"
                          sx={{
                            transition: 'all 0.3s ease',
                            '&:hover': {
                              backgroundColor: alpha(theme.palette.primary.main, 0.1),
                              transform: 'scale(1.1)'
                            }
                          }}
                        >
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
                <Button 
                  type="submit"
                  variant="contained" 
                  color={isLogin ? "primary" : "secondary"}
                  size="large" 
                  sx={{ 
                    mt: 2,
                    py: 1.5,
                    fontSize: '1.1rem',
                    textTransform: 'none',
                    boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
                    transition: 'all 0.3s ease',
                    background: `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                    backgroundSize: '200% 200%',
                    animation: `${gradient} 5s ease infinite`,
                    backdropFilter: 'blur(5px)',
                    '&:hover': {
                      boxShadow: '0 6px 25px rgba(0,0,0,0.2)',
                      transform: 'translateY(-2px)',
                      backgroundSize: '200% 200%',
                      animation: `${gradient} 5s ease infinite`
                    }
                  }}
                >
                  {isLogin ? '登錄' : '註冊'}
                </Button>
                <Button 
                  variant="text" 
                  onClick={toggleForm}
                  sx={{ 
                    mt: 1,
                    color: 'text.secondary',
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      backgroundColor: 'transparent',
                      color: theme.palette.primary.main,
                      transform: 'translateY(-1px)'
                    }
                  }}
                >
                  {isLogin ? '沒有帳號？點擊註冊' : '已有帳號？點擊登錄'}
                </Button>
              </Box>
            </Box>
          </Paper>
        </Box>

        <Box
          component="footer"
          sx={{
            mt: { xs: 4, md: 8 },
            pt: 4,
            borderTop: '1px solid rgba(255, 255, 255, 0.1)',
            textAlign: 'center',
            opacity: mounted ? 1 : 0,
            transform: mounted ? 'translateY(0)' : 'translateY(20px)',
            transition: 'opacity 0.8s ease 0.4s, transform 0.8s ease 0.4s'
          }}
        >
          <Typography variant="body2" color="text.secondary">
            © {new Date().getFullYear()} 知識協作平台. 保留所有權利.
          </Typography>
        </Box>
      </Container>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert 
          onClose={handleCloseSnackbar} 
          severity={snackbar.severity}
          sx={{ width: '100%' }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
}