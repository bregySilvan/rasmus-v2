import { IUserConfig } from '../user-config.interface';
import { IServerConfig } from './server-config.interface';

// Server config is holds the technical aspects of configuration
// and user config represents data a user would usually enter and 
// which is more variable.
// later on Userconfig will be collected from a plain text file which the user 
// can create via client.
export interface IConfig extends IUserConfig, IServerConfig {

}