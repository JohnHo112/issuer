const {
  Account,
  RevocationBitmap,
  ExplorerUrl,
} = require('@iota/identity-wasm/node')
const { loadDID } = require('./loadDid')

/**
 * Add a RevocationBitmap service to a DID Document.
 * This allows verifiers to check whether a credential has been revoked.
 *
 * @param name Name of Issuer to locate DID in `stronhold-files/<name>.hodl`
 * @param password Stronghold password.
 * @param fragment Fragment of revocation bitmap to be created.
 */
async function addRevocationBitmap(
  name,
  password,
  fragment
) {
  const account = await loadDID(name, password)

  console.log('Creating revocation bitmap...')

  const revocationBitmap = new RevocationBitmap()
  await account.createService({
    fragment,
    type: RevocationBitmap.type(),
    endpoint: revocationBitmap.toEndpoint(),
  })
  console.log('Success!')
  console.log(`Explorer Url:`, ExplorerUrl.mainnet().resolverUrl(account.did()))
}

exports.addRevocationBitmap = addRevocationBitmap;
