import { DeployFunction } from 'hardhat-deploy/types';
import { HardhatRuntimeEnvironment } from 'hardhat/types';


const func: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  const { deployer } = await hre.getNamedAccounts();
  const { deploy } = hre.deployments;
  await deploy('SimpleStorage', {
    contract: 'SimpleStorage',
    from: deployer,
    args: [],
    log: true,
  });
};
export default func;
func.id = 'deploy_simple_storage';
func.tags = ['DeploySimpleStorage', 'SimpleStorage'];