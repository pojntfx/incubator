# Cobalt Learning

@pojntfx trying out [Cobalt](https://cobalt-org.github.io).

## Usage

```bash
# Install dependencies
sudo dnf install cmake git curl
# Install Rust
curl https://sh.rustup.rs -sSf | sh
source $HOME/.cargo/env
# Install Cobalt
git clone https://github.com/cobalt-org/cobalt.rs.git && cd cobalt.rs && cargo build --release && cargo test && cd .. && rm -rf cobalt.rs
# Serve development version on https://localhost:3000
cobalt serve
```
