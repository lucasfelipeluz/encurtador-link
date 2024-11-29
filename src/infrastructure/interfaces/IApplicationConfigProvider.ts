import { AuthConfig } from 'src/domain/utils/authConfig';

interface IApplicationConfigProvider {
  getAuthConfig(): AuthConfig;
}

export default IApplicationConfigProvider;
