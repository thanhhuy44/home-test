import { useForm } from 'react-hook-form';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '../components/ui/card';
import { Button } from '../components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../components/ui/form';
import { Input } from '../components/ui/input';
import { useAuth } from '../store/auth';
import { useNavigate } from 'react-router-dom';
import { useToast } from '../hooks/use-toast';
import useSocket from '../hooks/use-socket';

type FormBody = { username: string };

function Login() {
  const form = useForm<FormBody>();
  const { onLogin } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const { socket } = useSocket();

  const onSubmit = async (data: FormBody) => {
    try {
      socket.connect();
      socket.emit('user:login', data.username);
      onLogin({
        id: data.username,
        username: data.username,
        online: true,
      });
      navigate('/', {
        replace: true,
      });
    } catch (error) {
      console.error('🚀 ~ onSubmit ~ error:', error);
      toast({
        title: 'Error',
        variant: 'destructive',
      });
    }
  };

  return (
    <main className="w-full max-w-lg">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <Card className="">
            <CardHeader>
              <CardTitle>Welcome to Chat App!</CardTitle>
              <CardDescription>Login</CardDescription>
            </CardHeader>
            <CardContent>
              <FormField
                control={form.control}
                name="username"
                rules={{
                  required: {
                    value: true,
                    message: 'This field is required!',
                  },
                }}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>User name</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="Your user name..." />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </CardContent>
            <CardFooter className="justify-end">
              <Button>Login</Button>
            </CardFooter>
          </Card>
        </form>
      </Form>
    </main>
  );
}

export default Login;
