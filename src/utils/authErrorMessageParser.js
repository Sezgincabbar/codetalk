export default function (errorCode) {
  switch (errorCode) {
    case 'auth/invalid-email':
      return 'Geçersiz e-posta adresi';

    case 'auth/email-already-exist':
      return 'Kullanıcı zaten kayıtlı';

    case 'auth/user-not-found':
      return 'Kullanıcı bulunamadı';

    case 'auth/weak-password':
      return 'Zayıf şifre';
    case 'auth/wrong-password':
      return 'Şifre hatalı';
    case 'auth/email-already-in-use':
      return 'Mail zaten kullanılıyor';
    default:
      return errorCode;
  }
}
