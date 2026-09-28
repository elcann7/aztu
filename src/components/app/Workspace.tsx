import { DatabaseProvider } from '../../context/DatabaseContext';
import { AppShell } from './AppShell';

export const Workspace = () => <DatabaseProvider><AppShell /></DatabaseProvider>;
