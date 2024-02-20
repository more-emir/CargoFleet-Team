import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Icon from '@material-ui/core/Icon';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import clsx from 'clsx';
import { motion } from 'framer-motion';
import { darken } from '@material-ui/core/styles/colorManipulator';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

const useStyles = makeStyles(theme => ({
  root: {
    background: `linear-gradient(to right, ${theme.palette.primary.dark} 0%, ${darken(
      theme.palette.primary.dark,
      0.5
    )} 100%)`,
    color: theme.palette.primary.contrastText
  },
  leftSection: {},
  rightSection: {
    background: `linear-gradient(to right, ${theme.palette.primary.dark} 0%, ${darken(
      theme.palette.primary.dark,
      0.5
    )} 100%)`,
    color: theme.palette.primary.contrastText
  }
}));

function MailConfirmPage(props) {
  const user = useSelector(({ auth }) => auth.user);
  const classes = useStyles();

  return (
    <div className={clsx(classes.root, 'flex flex-col flex-auto items-center justify-center p-16 sm:p-32')}>
      <div className="flex flex-col items-center justify-center w-full">
        <motion.div initial={{ opacity: 0, scale: 0.6 }} animate={{ opacity: 1, scale: 1 }}>
          <Card className="w-full max-w-384">
            <CardContent className="flex flex-col items-center justify-center p-16 sm:p-24 md:p-32">
              <div className="m-32">
                <Icon className="text-96" color="action">
                  email
                </Icon>
              </div>

              <Typography variant="h5" className="text-center mb-16 font-semibold">
                Recovery password
              </Typography>

              <Typography className="text-center mb-16 w-full" color="textSecondary">
                A reset password link has been sent on <b>{user.data.email}</b>.
              </Typography>

              <Typography className="text-center w-full" color="textSecondary">
                Check your inbox and click on the link and follow the instructions.
              </Typography>

              <div className="flex flex-col items-center justify-center pt-32 pb-24">
                <Link className="font-normal" to="/login">
                  Go back to login
                </Link>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}

export default MailConfirmPage;