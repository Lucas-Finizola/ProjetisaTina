# To learn more about how to use Nix to configure your environment
# see: https://developers.google.com/idx/guides/customize-idx-env
{ pkgs, ... }: {
  # Which nixpkgs channel to use.
  channel = "stable-24.05"; # or "unstable"

  # Use https://search.nixos.org/packages to find packages
  packages = [
    pkgs.nodejs_20
    # Add pnpm as a direct Nix package
    pkgs.pnpm
  ];

  # Sets environment variables in the workspace
  env = {};

  idx = {
    # Search for the extensions you want on https://open-vsx.org/ and use "publisher.id"
    extensions = [
      "dbaeumer.vscode-eslint"
    ];

    # Workspace lifecycle hooks
    workspace = {
      # Runs when a workspace is first created
      onCreate = {
        # Now that pnpm is a Nix package, we can use it directly.
        pnpm-install = "pnpm install";
      };
      # Runs when the workspace is (re)started
      onStart = {
        # Start the dev server
        dev-server = "pnpm run dev";
      };
    };

    # Enable previews
    previews = {
      enable = true;
      previews = {
        web = {
          # Run "pnpm run dev" with PORT set to IDX's defined port
          command = ["pnpm" "run" "dev" "--" "--port" "$PORT"];
          manager = "web";
        };
      };
    };
  };
}
