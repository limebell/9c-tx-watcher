import { gql } from "graphql-request";

export const MinerAddressQuery = gql`
  query MinerAddress {
    minerAddress
  }
`;

export const NextTxNonceQuery = gql`
  query NextTxNonce($address: Address!) {
    transaction {
      nextTxNonce(address: $address)
    }
  }
`;

export const TransactionCommonFragmentDoc = gql`
  fragment TransactionCommon on Transaction {
    actions {
      raw(encode: "hex")
      inspection
    }
    id
    nonce
    publicKey
    signature
    signer
    timestamp
    updatedAddresses
  }
`;

export const StagedTransactionsQuery = gql`
  query StagedTransactions(
    $signer: Address
    $involvedAddress: Address
    $desc: Boolean!
    $offset: Int!
    $limit: Int!
  ) {
    chainQuery {
      transactionQuery {
        stagedTransactions(
          signer: $signer
          involvedAddress: $involvedAddress
          desc: $desc
          offset: $offset
          limit: $limit
        ) {
          ...TransactionCommon
        }
      }
    }
  }
  ${TransactionCommonFragmentDoc}
`;

export const StoredTransactionQuery = gql`
  query StoredTransaction($id: ID) {
    chainQuery {
      transactionQuery {
        transaction(id: $id) {
          ...TransactionCommon
        }
      }
    }
  }
  ${TransactionCommonFragmentDoc}
`;
