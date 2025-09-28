# To learn more about how to use Nix to configure your environment
# see: https://developers.google.com/idx/guides/customize-idx-env
{ pkgs, ... }: {
  # Which nixpkgs channel to use.
  channel = "stable-24.05"; # or "unstable"

  # Use https://search.nixos.org/packages to find packages
  packages = [
    pkgs.nodejs_20
    pkgs.pnpm
  ];

  # Sets environment variables in the workspace
  env = {
    # Change TinaCMS datalayer port to avoid conflicts
    TINA_PUBLIC_DATALAYER_PORT = "9001";
  };

  idx = {
    # Search for the extensions you want on https://open-vsx.org/ and use "publisher.id"
    extensions = [
      "dbaeumer.vscode-eslint"
    ];

    # Workspace lifecycle hooks
    workspace = {
      # Runs when a workspace is first created
      onCreate = {
        # Use pnpm to install, as defined in packages
        pnpm-install = "pnpm install";
      };
      # onStart is not needed, you will run the dev server manually
      onStart = {};
    };

    # Previews are disabled to give you manual control over the server
    previews = {
      enable = false;
    };
  };
}
